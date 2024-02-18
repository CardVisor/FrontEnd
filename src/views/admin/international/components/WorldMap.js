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
} from "@chakra-ui/react";
import axios from "axios";
import TopMonthFilter from "./TopMonthFilter";
import {
    FaFilePdf,
    FaPlayCircle,
    FaRegFilePdf,
    FaRegStopCircle,
} from "react-icons/fa";
import { chartNationInfo } from "../variables/chartNationInfo";

// 국가 데이터를 가져오기 위한 API URL
const COUNTRIES_URL = "https://unpkg.com/world-atlas/countries-50m.json";
const ANIMATION_INTERVAL = 2000;

// 필요한 Chart.js 모듈 등록
ChartJS.register(
    Title,
    Tooltip,
    Legend,
    CategoryScale,
    ChartGeo.ChoroplethController,
    ChartGeo.ProjectionScale,
    ChartGeo.ColorScale,
    ChartGeo.GeoFeature
);

function WorldMap(props) {
    const [animationRunning, setAnimationRunning] = useState(true);
    const animationRunningRef = useRef(animationRunning);
    const mapChartRef = useRef(null);
    const countriesRef = useRef(null);
    let animationFrameId = null;

    const [selectStartMonth, setSelectStartMonth] = useState(null);
    const [selectEndMonth, setSelectEndMonth] = useState(null);
    const [chartData, setChartData] = useState(null);

    // 차트 데이터 업데이트를 위한 애니메이션 함수
    /*
    const animate = () => {
        if (!animationRunningRef.current || !mapChartRef.current) {
            return;
        }

        mapChartRef.current.data.datasets[0].data = countriesRef.current.map(
            (country) => ({
                feature: country,
                value: Math.random() * 100,
            })
        );

        mapChartRef.current.update();

        animationFrameId = setTimeout(animate, ANIMATION_INTERVAL);
    };
 */

    const numberWithCommas = (x) => {
        return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    //tooltip
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
                    <div class="state-info__value">${bodyLines}</div>
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

    const nationInfoByCode = chartNationInfo.reduce((acc, curr) => {
        acc[curr.nationCode] = curr;
        return acc;
    }, {});

    const updateChart = (month) => {
        const chartDataStructure = {
            labels: countriesRef.current.map((country) => {
                let kName, ageGroup, totalAmount, totalCount;
                const target = Object.values(chartData).find(
                    (target) => target.eName === country.properties.name
                );
                if (target && target.payment_month[month]) {
                    kName = target.kName;
                    ageGroup = target.payment_month[month].age_range;
                    totalAmount = target.payment_month[month].total_amount;
                    //totalCount = target.payment_month[month].total_payment_count;
                }
                return `<div>
                            ${month? `<div>${month}</div>`: ""}
                            ${kName? `<span>${kName}</span> / `: ""}
                            <span>${country.properties.name}</span>
                            ${ageGroup? `<div>가장 많이 방문하는 연령대: ${ageGroup}</div>`: ""}
                            ${totalAmount? `<div>총 매출액: ${numberWithCommas(totalAmount)} 원</div>`: ""}
                        </div>
                        <span>총 결제 건수</span>
                        `;
            }),
            datasets: [
                {
                    label: "Nation",
                    data: countriesRef.current.map((country) => {
                        let value = 0; // default value
                        const target = Object.values(chartData).find(
                            (target) => target.eName === country.properties.name
                        );
                        if (target && target.payment_month[month]) {
                            value =
                                target.payment_month[month].total_payment_count;
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
                method: "get",
                url: `/international/chartDataList?startMonth=${selectStartMonth}&endMonth=${selectEndMonth}`,
            })
                .then((res) => {
                    const dataByCountryAndMonth = res.data.reduce(
                        (acc, curr) => {
                            const nationInfo = nationInfoByCode[curr.nation];
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
                                acc[nationInfo.nationCode].payment_month[
                                    curr.payment_month
                                ] = {
                                    month: curr.payment_month,
                                    age_range: curr.age_range,
                                    total_amount: curr.total_amount,
                                    total_payment_count:
                                        curr.total_payment_count,
                                };
                            }
                            return acc;
                        },
                        {}
                    );
                    setChartData(dataByCountryAndMonth);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [selectStartMonth, selectEndMonth]);

    const firstRenderRef = useRef(true);

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

            updateChart(months[0]);

            let index = firstRenderRef.current ? 1 : 0;
            intervalId = setInterval(() => {
                updateChart(months[index]);
                index = (index + 1) % months.length;
            }, 2000);

            firstRenderRef.current = false;
        }

        return () => {
            if (intervalId !== null) {
                clearInterval(intervalId);
            }
        };
    }, [animationRunning, chartData, selectStartMonth, selectEndMonth]);

    useEffect(() => {
        console.log("chartData updated:", chartData);
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

    /*
    useEffect(() => {
        // 애니메이션이 실행 중이고 차트가 존재하며 국가 데이터가 있는 경우 애니메이션을 계속 진행
        if (animationRunning && mapChartRef.current && countriesRef.current) {
            animate();
        }
    }, [animationRunning]);

 */
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
                <Text color={textColor} fontSize="20px" fontWeight="700">
                    월간 해외 결제 리포트
                    <Button
                        colorScheme="blue"
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
                    />
                    <IconButton
                        colorScheme="green"
                        aria-label="엑셀로 내보내기"
                        icon={<FaRegFilePdf />}
                        borderRadius="10px"
                        w="auto"
                        ml="10px"
                    />
                    <IconButton
                        colorScheme="red"
                        aria-label="PDF로 내보내기"
                        icon={<FaFilePdf />}
                        borderRadius="10px"
                        w="auto"
                    />
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
