import { Chart } from "chart.js";
import Card from "components/card/Card";
import React from "react";
import * as ChartGeo from "chartjs-chart-geo";
import {
    Chart as ChartJS,
    CategoryScale,
    Tooltip,
    Title,
    Legend,
} from "chart.js";
import { chartNationInfo } from "../variables/chartNationInfo";

//const nationInfo = [...chartNationInfo];

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

const mapUrl = "https://unpkg.com/world-atlas/countries-50m.json";
fetch(mapUrl)
    .then((res) => res.json())
    .then((dataPoint) => {
        const countries = ChartGeo.topojson.feature(
            dataPoint,
            dataPoint.objects.countries
        ).features;

        //차트를 그리기 위한 데이터셋
        const chartData = {
            labels: countries.map((country) => country.properties.name),
            datasets: [
                {
                    label: "Nation",
                    data: countries.map((country) => ({
                        feature: country,
                        value: Math.random() * 100,
                    })), //노출데이터는 랜덤값으로 표기
                },
            ],
        };

        //차트 생성
        const mapChart = new Chart(
            document.getElementById("mapChart").getContext("2d"),
            {
                type: "choropleth", //차트 모양 > 지구본 타입 설정
                data: chartData,
                options: {
                    showOutline: true,  //지구본 원형라인 잡아주기
                    showGraticule: true,    //지구본 위, 경도선 그려주기
                    plugins: {
                        legend: {
                            display: false, //chart.js차트 범례 숨기기(별도 표기가 됨)
                        },
                    },
                    scales: {
                        projection: {
                            axis: "x",
                            projection: "equalEarth",   //지구본 모양으로 변경
                        },
                    },
                },
            }
        );
    });

function WorldMap(props) {
    return (
        <Card>
            <canvas id="mapChart"></canvas>
        </Card>
    );
}

export default WorldMap;
