import React, { useEffect, useRef } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

export default function AmChart({data}) {
    const chartRef = useRef(null);
     // chartRef를 선언. 이 참조는 차트 객체를 저장하는 데 사용
    useEffect(() => {
        console.log(data);
        if (!data) return; // data가 없으면 종료

        // 배열의 길이 확인
        if (data.cardName.length < 5 || data.cardMcc.length < 5) {
            console.error("data.cardName or data.cardMcc is too short!");
            return;
        }
        
        const dataForChart  = [{
            "year": "주 사용카드",
            [data.cardName[0][0]]: data.cardName[0][1],
            [data.cardName[1][0]]: data.cardName[1][1],
            [data.cardName[2][0]]: data.cardName[2][1],
            [data.cardName[3][0]]: data.cardName[3][1],
            [data.cardName[4][0]]: data.cardName[4][1],
        }, {
            "year": "주 사용처",
            [data.cardMcc[0][0]]: data.cardMcc[0][1],
            [data.cardMcc[1][0]]: data.cardMcc[1][1],
            [data.cardMcc[2][0]]: data.cardMcc[2][1],
            [data.cardMcc[3][0]]: data.cardMcc[3][1],
            [data.cardMcc[4][0]]: data.cardMcc[4][1],
        }];

        am5.ready(function() {
            const root = am5.Root.new("chartdiv");
            root.setThemes([am5themes_Animated.new(root)]);

            chartRef.current = root.container.children.push(am5xy.XYChart.new(root, {
                panX: false,
                panY: false,
                wheelX: "panX",
                wheelY: "zoomX",
                paddingLeft: 0,
                layout: root.verticalLayout
            }));

            chartRef.current.set("scrollbarX", am5.Scrollbar.new(root, { orientation: "horizontal" }));

            const xRenderer = am5xy.AxisRendererX.new(root, { minorGridEnabled: true });
            const xAxis = chartRef.current.xAxes.push(am5xy.CategoryAxis.new(root, {
                categoryField: "year",
                renderer: xRenderer,
                tooltip: am5.Tooltip.new(root, {})
            }));
            xRenderer.grid.template.setAll({ location: 1 });
            xAxis.data.setAll(dataForChart);

            const yAxis = chartRef.current.yAxes.push(am5xy.ValueAxis.new(root, {
                min: 0,
                renderer: am5xy.AxisRendererY.new(root, { strokeOpacity: 0.1 })
            }));

            const legend = chartRef.current.children.push(am5.Legend.new(root, { centerX: am5.p50, x: am5.p50 }));

            function makeSeries(name, dataField) {
                const series = chartRef.current.series.push(am5xy.ColumnSeries.new(root, {
                    name: name,
                    stacked: true,
                    xAxis: xAxis,
                    yAxis: yAxis,
                    valueYField: dataField,
                    categoryXField: "year"
                }));
                series.columns.template.setAll({ tooltipText: "{name}, {categoryX}: {valueY}", tooltipY: am5.percent(10) });
                series.data.setAll(dataForChart);
                series.appear();
                series.bullets.push(function () {
                    return am5.Bullet.new(root, {
                        sprite: am5.Label.new(root, { text: "{valueY}", fill: root.interfaceColors.get("alternativeText"), centerY: am5.p50, centerX: am5.p50, populateText: true })
                    });
                });
                legend.data.push(series);
            }

            data.cardName.forEach((card) => makeSeries(card[0], card[0]));
            data.cardMcc.forEach((mcc) => makeSeries(mcc[0], mcc[0]));

            chartRef.current.appear(1000, 100);
        });

        return () => {
            if (chartRef.current) {
                chartRef.current.dispose();
            }
        };
    }, [data]);

    return (
        <div>
            <div id="chartdiv" style={{ width: '100%', height: '500px' }}></div>
        </div>
    );
}