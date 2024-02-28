import React, { useEffect, useState } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import Card from 'components/card/Card';
import { Box, Flex, Text } from '@chakra-ui/react';
import * as am5plugins_exporting from '@amcharts/amcharts5/plugins/exporting';
//import { benefitState } from "views/admin/Recoil/BenefitCluster";
//import { useSetRecoilState } from "recoil";
function BenefitPieOfPieForBottom5(props) {
    const { data, val, id } = props;
    useEffect(() => {
        var root = am5.Root.new(id);
        if (root._logo) {
            root._logo.dispose();
        }

        let exporting = am5plugins_exporting.Exporting.new(root, {
            menu: am5plugins_exporting.ExportingMenu.new(root, {}),
        });
        // Set themes
        root.setThemes([am5themes_Animated.new(root)]);
        root.interfaceColors.set('grid', am5.color(0xff0000));
        // Set container, chart&root, series
        var container = root.container.children.push(
            am5.Container.new(root, {
                width: am5.p100,
                height: am5.p100,
                layout: root.horizontalLayout,
            })
        );

        var chart = container.children.push(
            am5percent.PieChart.new(root, {
                radius: am5.percent(40),
                tooltip: am5.Tooltip.new(root, {}),
            })
        );

        var series = chart.series.push(
            am5percent.PieSeries.new(root, {
                valueField: 'value',
                categoryField: 'category',
                alignLabels: false,
                // legendLabelText: "[{fill}]{category}[/]",
                // legendValueText: "[bold {fill}]{value}[/]",
                legendLabelText: '[#808080 fontSize: 12px fontWeight: 700]{category}[/]',
                legendValueText: '[#808080 fontSize: 12px fontWeight: 300]{value}[/]',
            })
        );

        series.labels.template.setAll({
            textType: 'regular',
            text: 'value', // 원래 데이터 값 참조
            radius: 4,
        });
        series.labels.template.set('visible', false);
        series.ticks.template.set('visible', false);
        series.slices.template.set('toggleKey', 'none');

        // add events
        series.slices.template.events.on('click', function (e) {
            selectSlice(e.target);
        });

        // Create sub chart
        // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
        var subChart = container.children.push(
            am5percent.PieChart.new(root, {
                radius: am5.percent(60),
                tooltip: am5.Tooltip.new(root, {}),
            })
        );

        var subSeries = subChart.series.push(
            am5percent.PieSeries.new(root, {
                valueField: 'value',
                categoryField: 'category',
            })
        );

        subSeries.data.setAll([
            { category: 'A', value: 0 },
            { category: 'B', value: 0 },
            { category: 'C', value: 0 },
            { category: 'D', value: 0 },
            { category: 'E', value: 0 },
            { category: 'F', value: 0 },
            { category: 'H', value: 0 },
            { category: 'I', value: 0 },
            { category: 'J', value: 0 },
            { category: 'K', value: 0 },
            { category: 'L', value: 0 },
            { category: 'M', value: 0 },
            { category: 'N', value: 0 },
            { category: 'O', value: 0 },
        ]);

        subSeries.labels.template.setAll({
            text: '[bold {fill}]{category} : [/] [font-weight: bold; color: #000000]{value}',
            fontSize: 12,
        });

        subSeries.slices.template.set('toggleKey', 'active');
        // subSeries.labels.template.set("visible", false);
        subSeries.ticks.template.set('forceHidden', true);

        var selectedSlice;

        series.on('startAngle', function () {
            updateLines();
        });
        container.events.on('boundschanged', function () {
            root.events.once('frameended', function () {
                updateLines();
            });
        });

        //서브 pie의 라인 위치 계산 함수

        function updateLines() {
            if (selectedSlice) {
                var startAngle = selectedSlice.get('startAngle');
                var arc = selectedSlice.get('arc');
                var radius = selectedSlice.get('radius');

                var x00 = radius * am5.math.cos(startAngle);
                var y00 = radius * am5.math.sin(startAngle);

                var x10 = radius * am5.math.cos(startAngle + arc);
                var y10 = radius * am5.math.sin(startAngle + arc);

                var subRadius = subSeries.slices.getIndex(0).get('radius');
                var x01 = 0;
                var y01 = -subRadius;

                var x11 = 0;
                var y11 = subRadius;

                var point00 = series.toGlobal({ x: x00, y: y00 });
                var point10 = series.toGlobal({ x: x10, y: y10 });

                var point01 = subSeries.toGlobal({ x: x01, y: y01 });
                var point11 = subSeries.toGlobal({ x: x11, y: y11 });

                line0.set('points', [point00, point01]);
                line1.set('points', [point10, point11]);
            }
        }

        // lines
        var line0 = container.children.push(
            am5.Line.new(root, {
                position: 'absolute',
                stroke: am5.color('#D3D3D3'),
                strokeDasharray: [2, 2],
            })
        );
        var line1 = container.children.push(
            am5.Line.new(root, {
                position: 'absolute',
                stroke: am5.color('#D3D3D3'),
                strokeDasharray: [2, 2],
            })
        );

        // Set data
        series.data.setAll(data);
        // slice Logic End
        // slice Logic Start
        function selectSlice(slice) {
            selectedSlice = slice;
            var dataItem = slice.dataItem;
            var dataContext = dataItem.dataContext;
            if (dataContext) {
                var i = 0;
                subSeries.data.each(function (dataObject) {
                    var dataObj = dataContext.subData[i];
                    if (dataObj) {
                        if (!subSeries.dataItems[i].get('visible')) {
                            subSeries.dataItems[i].show();
                        }
                        subSeries.data.setIndex(i, dataObj);
                    } else {
                        subSeries.dataItems[i].hide();
                    }

                    i++;
                });
            }

            var middleAngle = slice.get('startAngle') + slice.get('arc') / 2;
            var firstAngle = series.dataItems[0].get('slice').get('startAngle');

            series.animate({
                key: 'startAngle',
                to: firstAngle - middleAngle,
                duration: 1000,
                easing: am5.ease.out(am5.ease.cubic),
            });
            series.animate({
                key: 'endAngle',
                to: firstAngle - middleAngle + 360,
                duration: 1000,
                easing: am5.ease.out(am5.ease.cubic),
            });
        }
        // 컨테이너의 애니메이션 동작시간
        container.appear(1000, 10);

        series.events.on('datavalidated', function () {
            selectSlice(series.slices.getIndex(0));
        });

        // Create legend
        var legend = chart.children.push(
            am5.Legend.new(root, {
                // centerX: am5.percent(50),
                // x: am5.percent(50),
                // centerY: am5.percent(50),
                // y: am5.percent(85),
                // layout: am5.GridLayout.new(root, {
                //   maxColumns: 5,
                //   fixedWidthGrid: true,
                // }),
                centerY: am5.percent(50),
                y: am5.percent(60),
                layout: root.verticalLayout,
                height: am5.percent(100),
                verticalScrollbar: am5.Scrollbar.new(root, {
                    orientation: 'vertical',
                }),
            })
        );
        //legend.valueLabels.template.set("forceHidden", true);
        // legend.labels.template.setAll({
        //   fontSize: 10,
        //   fontWeight: "500",
        // });

        legend.data.setAll(series.dataItems);
        return () => {
            // root가 존재하면 차트를 제거
            root && root.dispose();
        };
    }, [data]); // data가 변경될 때마다 차트를 새로 생성
    return (
        <Card p="20px">
            <Flex direction={{ base: 'column' }} justify="center">
                <Box mb={{ base: '1px', '2xl': '1px' }} position="relative">
                    <Text fontSize="xl">{val}</Text>
                    <div id={id} style={{ width: '100%', height: '500px' }}></div>
                </Box>
            </Flex>
        </Card>
    );
}

export default BenefitPieOfPieForBottom5;

// 대분류 차트 라벨 표시
// series.labels.template.setAll({
//   textType: "circular",
//   radius: 4,
//   //   inside: true,
// });
// series.ticks.template.set("visible", false);

// 차트 내부에 값 표시
// series.ticks.template.setAll({
//   location: 0.5,
//   length: 0,
//   visible: true,
// });
