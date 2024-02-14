import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import Card from 'components/card/Card';

am4core.useTheme(am4themes_animated);

const JobInformation = (props) => {
    const { ...rest } = props;
    const [jobTypes, setJobTypes] = useState([]);
    const chartRef = useRef(null);

    useEffect(() => {
        axios.get('/customer/jobTypes')
            .then(response => {
                const jobTypesData = response.data;
                jobTypesData.sort((a, b) => b.count - a.count); // 값이 큰 순서대로 정렬
                setJobTypes(jobTypesData);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, []);

    useEffect(() => {
        if (jobTypes.length > 0) {
            let chart = am4core.create(chartRef.current, am4charts.SlicedChart);
            chart.hiddenState.properties.opacity = 0;

            chart.data = jobTypes.map(jobType => ({
                name: jobType.jobType,
                value: jobType.count
            }));

            let series = chart.series.push(new am4charts.PictorialStackedSeries());
            series.dataFields.value = "value";
            series.dataFields.category = "name";
            series.alignLabels = true;

            series.maskSprite.scale = 0.5; // 스케일을 0.5로 조절
            series.maskSprite.path = "M53.5,476c0,14,6.833,21,20.5,21s20.5-7,20.5-21V287h21v189c0,14,6.834,21,20.5,21 c13.667,0,20.5-7,20.5-21V154h10v116c0,7.334,2.5,12.667,7.5,16s10.167,3.333,15.5,0s8-8.667,8-16V145c0-13.334-4.5-23.667-13.5-31 s-21.5-11-37.5-11h-82c-15.333,0-27.833,3.333-37.5,10s-14.5,17-14.5,31v133c0,6,2.667,10.333,8,13s10.5,2.667,15.5,0s7.5-7,7.5-13 V154h10V476 M61.5,42.5c0,11.667,4.167,21.667,12.5,30S92.333,85,104,85s21.667-4.167,30-12.5S146.5,54,146.5,42 c0-11.335-4.167-21.168-12.5-29.5C125.667,4.167,115.667,0,104,0S82.333,4.167,74,12.5S61.5,30.833,61.5,42.5z";

          //   chart.legend = new am4charts.Legend();
          //   chart.legend.position = "left";
          //   chart.legend.valign = "bottom";

          // chart.legend.fontSize = 10; // 폰트 사이즈 조절
          // chart.legend.itemContainers.template.paddingTop = 1; // 상단 패딩 조절
          // chart.legend.itemContainers.template.paddingBottom = 1; // 하단 패딩 조절
          // chart.legend.itemContainers.template.paddingLeft = 1; // 좌측 패딩 조절
          // chart.legend.itemContainers.template.paddingRight = 1; // 우측 패딩 조절
          // chart.legend.itemContainers.template.width = am4core.percent(80); // 범례 너비 조절
          // chart.legend.labels.template.truncate = true; // 긴 텍스트 자르기
          // chart.legend.labels.template.maxWidth = 90; // 최대 너비 설정

            return () => {
                chart.dispose();
            };
        }
    }, [jobTypes]);

    return (
      <Card mb={{ base: "0px", "2xl": "20px" }} {...rest}>
        <div id="chartdiv" ref={chartRef} style={{ width: "100%", height: "500px" }}></div>
        </Card>
    );
}

export default JobInformation;