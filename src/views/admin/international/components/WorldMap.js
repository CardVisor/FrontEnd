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
import { TopMonthFilter } from "./TopDateFilter";
import {
    FaFilePdf,
    FaPlayCircle,
    FaRegFilePdf,
    FaRegStopCircle,
} from "react-icons/fa";

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

    useEffect(() => {
        animationRunningRef.current = animationRunning;
    }, [animationRunning]);

    // 차트 데이터 업데이트를 위한 애니메이션 함수
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

    useEffect(() => {
        // 국가 데이터를 가져와 차트 초기화
        const fetchData = async () => {
            try {
                const res = await fetch(COUNTRIES_URL);
                const dataPoint = await res.json();

                // TopoJSON 형식의 데이터를 GeoJSON 형식으로 변환하여 countriesRef에 저장
                countriesRef.current = ChartGeo.topojson.feature(
                    dataPoint,
                    dataPoint.objects.countries
                ).features;

                // 차트에 표시할 데이터 구조
                const chartData = {
                    labels: countriesRef.current.map(
                        (country) => country.properties.name
                    ),
                    datasets: [
                        {
                            label: "Nation",
                            data: countriesRef.current.map((country) => ({
                                feature: country,
                                value: Math.random() * 100,
                            })),
                        },
                    ],
                };

                // 차트 구성 옵션
                const chartOptions = {
                    responsive: true,
                    maintainAspectRatio: false,
                    showOutline: true,
                    showGraticule: true,
                    plugins: {
                        legend: {
                            display: false,
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
                    // 차트 초기화
                    mapChartRef.current = new Chart(mapChartRef.current, {
                        type: "choropleth",
                        data: chartData,
                        options: chartOptions,
                    });

                    if (mapChartRef.current) {
                        animate();
                    }
                }
            } catch (error) {
                console.error("데이터 가져오기 오류:", error);
            }
        };

        // 데이터 가져와 차트 초기화
        fetchData();

        // 정리 함수
        return () => {
            clearTimeout(animationFrameId);
            if (mapChartRef && mapChartRef.current) {
                mapChartRef.current.destroy();
            }
        };
    }, []);

    useEffect(() => {
        // 애니메이션이 실행 중이고 차트가 존재하며 국가 데이터가 있는 경우 애니메이션을 계속 진행
        if (animationRunning && mapChartRef.current && countriesRef.current) {
            animate();
        }
    }, [animationRunning]);

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
                <Text
                    color={textColor}
                    fontSize="20px"
                    fontWeight="700"
                >
                    월간 해외 결제 리포트
                    {/* 
                    <IconButton
                    colorScheme="blue"
                        aria-label="애니메이션 제어"
                        icon={
                            animationRunning ? (
                                <FaRegStopCircle />
                            ) : (
                                <FaPlayCircle />
                            )
                        }
                        onClick={toggleAnimation}
                    />
                     */}
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
                <Flex justifyContent="flex-end" gap={1} pr="80px" mt="20px" mb="30px">
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
