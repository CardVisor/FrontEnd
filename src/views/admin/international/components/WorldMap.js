import { Chart } from "chart.js";
import Card from "components/card/Card";
import React, { useEffect, useState, useRef } from "react";
import * as ChartGeo from "chartjs-chart-geo";
import {
    Chart as ChartJS,
    CategoryScale,
    Tooltip,
    Title,
    Legend,
} from "chart.js";
import {
    Box,
    Button,
    Flex,
    IconButton,
    Text,
    useColorModeValue,
    useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import TopMonthFilter from "./TopMonthFilter";
import {
    FaFileDownload,
    FaFilePdf,
    FaPlayCircle,
    FaRegFilePdf,
    FaRegStopCircle,
} from "react-icons/fa";
import { chartNationInfo } from "../variables/chartNationInfo";
import { numberWithDots } from "../variables/util";
import DownloaderExcel from "./DownloadExcel";
import ModalInternationalReport from "./ModalInternationalReport";

// 국가 데이터를 가져오기 위한 API URL
const COUNTRIES_URL = "https://unpkg.com/world-atlas/countries-50m.json";

// Chart.js 모듈 등록
Chart.register(Title, Tooltip, Legend, CategoryScale, ChartGeo.ChoroplethController, ChartGeo.ProjectionScale, ChartGeo.ColorScale, ChartGeo.GeoFeature);

// tooltip
const getOrCreateTooltip = (chart) => {
    let tooltipEl = chart.canvas.parentNode.querySelector("div");

    if (!tooltipEl) {
        tooltipEl = document.createElement("div");
        tooltipEl.classList.add("geo-info-popup");
        tooltipEl.style.opacity = 1;
        tooltipEl.style.pointerEvents = "none";
        tooltipEl.style.position = "absolute";
        tooltipEl.style.transform = "translate(-50%, 0)";
        tooltipEl.style.transition = "all .1s ease";
        chart.canvas.parentNode.appendChild(tooltipEl);
    }

    return tooltipEl;
};

const nationInfoByCode = chartNationInfo.reduce((acc, curr) => {
    acc[curr.nationCode] = curr;
    return acc;
}, {});


const createChartData = (data) => {
    return Object.entries(data).reduce((acc, [nationCode, paymentInfo]) => {
        const nationInfo = nationInfoByCode[nationCode];
        if (nationInfo) {
            if (!acc[nationInfo.nationCode]) {
                acc[nationInfo.nationCode] = {
                    nation: nationInfo.nationCode,
                    eName: nationInfo.eName,
                    kName: nationInfo.kName,
                    currencyCode: nationInfo.currencyCode,
                    payment_month: {},
                };
            }
            Object.entries(paymentInfo).forEach(([payment_month, paymentDetail]) => {
                acc[nationInfo.nationCode].payment_month[payment_month] = {
                    ...paymentDetail,
                    month: payment_month,
                };
            });
        }
        return acc;
    }, {});
};

function WorldMap(props) {
    const [animationRunning, setAnimationRunning] = useState(true);
    const animationRunningRef = useRef(animationRunning);
    const [currentMonth, setCurrentMonth] = useState(null);
    const mapChartRef = useRef(null);
    const countriesRef = useRef(null);
    let animationFrameId = null;

    const [selectStartMonth, setSelectStartMonth] = useState(null);
    const [selectEndMonth, setSelectEndMonth] = useState(null);
    const [chartData, setChartData] = useState(null);
    const firstRenderRef = useRef(true);
    const { isOpen, onOpen, onClose } = useDisclosure() //modal
    //const btnRef = React.useRef(null)   //modal


    const externalTooltipHandler = (context) => {
        // Tooltip Element
        const { chart, tooltip } = context;
        const tooltipEl = getOrCreateTooltip(chart);
        // Hide if no tooltip
        if (tooltip.opacity === 0) {
            tooltipEl.style.opacity = 0;
            return;
        }

        // Set Body
        if (tooltip.body) {
            const titleLines = tooltip.title || [];
            const bodyLines = tooltip.body.map((b) => b.lines);
            //console.log({ titleLines }, { bodyLines }, { test: tooltip.labelColors });
            const colors = tooltip.labelColors[0];
            // Update Info
            tooltipEl.innerHTML = `
                <div class="state-info">
                    <div class="state-info__label">월별 신용카드 사용정보</div>
                    <div class="state-info__value">${bodyLines} 건</div>
                </div>`;
        }

        const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

        // Display, position, and set styles for font
        tooltipEl.style.opacity = 1;
        tooltipEl.style.left = positionX + tooltip.caretX + "px";
        tooltipEl.style.top = positionY + tooltip.caretY + "px";
        tooltipEl.style.font = tooltip.options.bodyFont.string;
        tooltipEl.style.padding =
            tooltip.options.padding + "px " + tooltip.options.padding + "px";
    };

    const updateChart = (month) => {
        const chartDataStructure = {
            labels: countriesRef.current.map((country) => {
                let kName, ageGroup, totalAmount, genderGroup;
                const target = Object.values(chartData).find(
                    (target) => target.eName === country.properties.name
                );
                if (target && target.payment_month[month]) {
                    kName = target.kName;
                    ageGroup = target.payment_month[month].age_range;
                    genderGroup = target.payment_month[month].gender_range;
                    totalAmount = target.payment_month[month].total_amount;
                }
                return `<div>
                            <div>${month? `${month.split("-")[0]}년 ${month.split("-")[1]}월` : ""}</div>
                            ${kName? `<span>${kName}</span> / `: ""}
                            <span>${country.properties.name}</span><br />
                            ${ageGroup?`<div>주 결제 고객층: ${ageGroup>=70?ageGroup+"대 이상":ageGroup+"대"} ${genderGroup}성</div>`:""}
                            <br />
                            ${totalAmount? `<div>총 매출액: ${numberWithDots(totalAmount)} 원</div>`: ""}
                            
                        </div>
                        <span>총 결제 건수</span>
                        `;
            }),
            datasets: [
                {
                    label: "Nation",
                    data: countriesRef.current.map((country) => {
                        let value = 0; 
                        const target = Object.values(chartData).find(
                            (target) => target.eName === country.properties.name
                        );
                        if (target && target.payment_month[month]) {
                            value = target.payment_month[month].total_payment_count;
                        }
                        return {
                            feature: country,
                            value: value,
                        };
                    }),
                },
            ],
        };

        mapChartRef.current.data = chartDataStructure;
        mapChartRef.current.update();
    };


    useEffect(() => {
        if (selectStartMonth !== null && selectEndMonth !== null) {
            axios({
                method: "post",
                url: `/international/chartDataList`,
                data: { period: { startMonth: selectStartMonth, endMonth: selectEndMonth } }
            })
                .then((res) => {
                    console.log("?resres.data???", res.data);
                    const dataByCountryAndMonth = createChartData(res.data);
                    setChartData(dataByCountryAndMonth);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [selectStartMonth, selectEndMonth]);

    useEffect(() => {
        if (selectStartMonth) {
            setCurrentMonth(selectStartMonth);
        }
    }, [selectStartMonth]);
    
    useEffect(() => {
        let intervalId = null;

        if (
            animationRunning &&
            chartData &&
            mapChartRef.current &&
            countriesRef.current &&
            selectStartMonth &&
            selectEndMonth
        ) {
            let startMonth = selectStartMonth;
            let endMonth = selectEndMonth;

            let start = new Date(startMonth);
            let end = new Date(endMonth);
            let months = [];
            for (let dt = start; dt <= end; dt.setMonth(dt.getMonth() + 1)) {
                months.push(dt.toISOString().slice(0, 7));
            }

            let index = firstRenderRef.current
                ? 0
                : months.indexOf(currentMonth);
            updateChart(months[index]);

            intervalId = setInterval(() => {
                index = (index + 1) % months.length;
                setCurrentMonth(months[index]);
                updateChart(months[index]);
            }, 3000);

            firstRenderRef.current = false;
        }

        return () => {
            if (intervalId !== null) {
                clearInterval(intervalId);
            }
        };
    }, [
        animationRunning,
        chartData,
        selectStartMonth,
        selectEndMonth,
        currentMonth,
    ]);

    useEffect(() => {
        //console.log("chartData updated:", chartData);
    }, [chartData]);

    useEffect(() => {
        animationRunningRef.current = animationRunning;
    }, [animationRunning]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(COUNTRIES_URL);
                const dataPoint = await res.json();

                countriesRef.current = ChartGeo.topojson.feature(
                    dataPoint,
                    dataPoint.objects.countries
                ).features;

                const chartOptions = {
                    responsive: true,
                    maintainAspectRatio: false,
                    showOutline: true,
                    showGraticule: true,
                    plugins: {
                        legend: {
                            display: false,
                        },
                        tooltip: {
                            enabled: false,
                            position: "average",
                            external: externalTooltipHandler,
                        },
                    },
                    scales: {
                        projection: {
                            axis: "x",
                            projection: "equalEarth",
                        },
                    },
                };

                if (mapChartRef && mapChartRef.current) {
                    mapChartRef.current = new Chart(mapChartRef.current, {
                        type: "choropleth",
                        data: [],
                        options: chartOptions,
                    });
                }
            } catch (error) {
                console.error("데이터 가져오기 오류:", error);
            }
        };

        fetchData();

        return () => {
            clearTimeout(animationFrameId);
            if (mapChartRef && mapChartRef.current) {
                mapChartRef.current.destroy();
            }
        };
    }, []);

    // 애니메이션 재생/일시정지 토글
    const toggleAnimation = () => {
        setAnimationRunning(!animationRunning);
    };
    // 컬러 모드에 따른 텍스트 색상
    const textColor = useColorModeValue("secondaryGray.900", "white");

    return (
        <>
            <Card>
                {/* 리포트 제목 */}
                <Text color={textColor} fontSize="20px" fontWeight="700" display="flex" alignItems="center" >
                    해외 월간 결제 리포트
                    <Button
                        colorScheme={animationRunning? "blackAlpha" : "blue"}
                        aria-label="애니메이션 제어"
                        onClick={toggleAnimation}
                        borderRadius="10px"
                        fontSize="12px"
                        h="30px"
                        pl="10px"
                        pr="10px"
                        ml="10px"
                        leftIcon={
                            animationRunning ? (
                                <FaRegStopCircle />
                            ) : (
                                <FaPlayCircle />
                            )
                        }
                    >
                        {animationRunning ? "Stop" : "Play"}
                    </Button>
                </Text>
                {/* 필터 및 내보내기 버튼 */}
                <Flex
                    justifyContent="flex-end"
                    gap={1}
                    pr="80px"
                    mt="20px"
                    mb="30px"
                >
                    <TopMonthFilter
                        setSelectStartMonth={setSelectStartMonth}
                        setSelectEndMonth={setSelectEndMonth}
                        setAnimationRunning={setAnimationRunning}
                    />
                    <IconButton
                        colorScheme="telegram"
                        aria-label="downloadIcon"
                        icon={<FaFileDownload />}
                        borderRadius="10px"
                        w="auto"
                        onClick={onOpen}
                    />
                    <ModalInternationalReport isOpen={isOpen} onClose={onClose} />
                </Flex>
                {/* 차트 캔버스 */}
                <Box minH="calc(100vh - 399px)">
                    <canvas ref={mapChartRef} />
                </Box>
            </Card>
        </>
    );
}

export default WorldMap;
