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
    Select,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import axios from "axios";
import { TopDateFilter, TopMonthFilter } from "./TopDateFilter";
import { FaFilePdf } from "react-icons/fa";

const COUNTRIES_URL = "https://unpkg.com/world-atlas/countries-50m.json";
const ANIMATION_INTERVAL = 2000; // 1.5초

// 필요한 모듈 등록
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
    const [animationRunning, setAnimationRunning] = useState(true); // 애니메이션 상태를 관리하는 state
    const animationRunningRef = useRef(animationRunning); // 애니메이션 상태를 참조하는 ref
    const mapChartRef = useRef(null); // mapChart를 참조하는 ref
    const countriesRef = useRef(null); // countries를 참조하는 ref
    let animationFrameId = null;

    const [selectStartMonth, setSelectStartMonth] = useState(null);
    const [selectEndMonth, setSelectEndMonth] = useState(null);
    useEffect(() => {
        animationRunningRef.current = animationRunning; // 애니메이션 상태가 변경될 때마다 ref를 업데이트
    }, [animationRunning]);

    const animate = () => {
        if (!animationRunningRef.current || !mapChartRef.current) {
            return; // 애니메이션이 정지된 상태라면 함수를 종료
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
        fetch(COUNTRIES_URL)
            .then((res) => res.json())
            .then((dataPoint) => {
                countriesRef.current = ChartGeo.topojson.feature(
                    dataPoint,
                    dataPoint.objects.countries
                ).features;

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

                const chartOptions = {
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
                }

                mapChartRef.current = new Chart(
                    mapChartRef.current,
                    {
                        type: "choropleth",
                        data: chartData,
                        options: chartOptions
                    }
                );

                animate();
            });

        return () => {
            clearTimeout(animationFrameId);
            if (mapChartRef.current) {
                mapChartRef.current.destroy();
            }
        };
    }, []);

    useEffect(() => {
        if (animationRunning && mapChartRef.current && countriesRef.current) {
            animate();
        }
    }, [animationRunning]);

    const toggleAnimation = () => {
        setAnimationRunning(!animationRunning); // 애니메이션 토글
    };

    const textColor = useColorModeValue("secondaryGray.900", "white");

    return (
        <>
            <Card>
                <Text
                    color={textColor}
                    fontSize="20px"
                    fontWeight="700"
                    lineHeight="100%"
                >
                    월간 해외 결제 리포트
                </Text>
                <Flex justifyContent="flex-end" gap={2} my="20px">
                    <TopMonthFilter
                        setSelectStartMonth={setSelectStartMonth}
                        setSelectEndMonth={setSelectEndMonth}
                    />
                    <IconButton
                        colorScheme="red"
                        aria-label="Search database"
                        icon={<FaFilePdf />}
                    />
                    <Button colorScheme="teal" onClick={toggleAnimation}>
                        {animationRunning ? "STOP" : "PLAY"}
                    </Button>
                </Flex>
                <Box>
                    <canvas ref={mapChartRef} />
                </Box>
            </Card>
        </>
    );
}

export default WorldMap;
