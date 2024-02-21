import React, { useEffect, useState } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5radar from "@amcharts/amcharts5/radar";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import axios from "axios";

function RadarChart(props) {
  const { id, card1, card2, month, mccdata1, mccdata2 } = props;

  useEffect(() => {
    var root = am5.Root.new(id);
    if (root._logo) {
      root._logo.dispose();
    }

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/radar-chart/
    var chart = root.container.children.push(
      am5radar.RadarChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
      })
    );

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/radar-chart/#Cursor
    var cursor = chart.set(
      "cursor",
      am5radar.RadarCursor.new(root, {
        behavior: "zoomX",
      })
    );

    cursor.lineY.set("visible", true);

    // Create axes and their renderers
    // https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_axes
    var xRenderer = am5radar.AxisRendererCircular.new(root, {});
    xRenderer.labels.template.setAll({
      radius: 1,
    });

    var xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0,
        categoryField: "country",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    var yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5radar.AxisRendererRadial.new(root, {}),
      })
    );

    var yRenderer = am5radar.AxisRendererRadial.new(root, {});
    yRenderer.labels.template.setAll({
      fontSize: 0,
    });
    yRenderer.ticks.template.setAll({
      visible: false,
    });
    var yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: yRenderer,
        fixAxisSize: true,
      })
    );

    // Create series
    // https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_series
    function createSeries(name, field) {
      var series = chart.series.push(
        am5radar.RadarLineSeries.new(root, {
          fill: "#5E3AFF",
          name: name,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "litres",
          categoryXField: "country",
          tooltip: am5.Tooltip.new(root, {
            labelText: "{valueY}",
          }),
        })
      );

      series.strokes.template.setAll({
        strokeWidth: 1,
        //fill: "#5E3AFF",
        stroke: "#5E3AFF",
      });
      series.bullets.push(function () {
        return am5.Bullet.new(root, {
          sprite: am5.Circle.new(root, {
            radius: 3,
            fill: series.get("fill"),
          }),
        });
      });
      return series;
    }

    function createSeries2(name, field) {
      var series = chart.series.push(
        am5radar.RadarLineSeries.new(root, {
          fill: "#56C3FF",
          name: name,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "litres",
          categoryXField: "country",
          tooltip: am5.Tooltip.new(root, {
            labelText: "{valueY}",
          }),
        })
      );

      series.strokes.template.setAll({
        strokeWidth: 1,
        //fill: "#5E3AFF",
        stroke: "#56C3FF",
      });
      series.bullets.push(function () {
        return am5.Bullet.new(root, {
          sprite: am5.Circle.new(root, {
            radius: 3,
            fill: series.get("fill"),
          }),
        });
      });
      return series;
    }

    var series1 = createSeries(card1.card_name, "value1");
    var series2 = createSeries2(card2.card_name, "value2");

    // Set data
    // https://www.amcharts.com/docs/v5/charts/radar-chart/#Setting_data
    var data = [
      {
        country: "교육",
        litres: mccdata1.edu,
      },
      {
        country: "카페/간식",
        litres: mccdata1.cafe,
      },
      {
        country: "편의점/마트/잡화",
        litres: mccdata1.mart,
      },
      {
        country: "취미/여가",
        litres: mccdata1.hobby,
      },
      {
        country: "술/유흥",
        litres: mccdata1.alchol,
      },
      {
        country: "보험/세금/기타금융",
        litres: mccdata1.cash,
      },
      {
        country: "기타",
        litres: mccdata1.etc,
      },
    ];

    var data2 = [
      {
        country: "교육",
        litres: mccdata2.edu,
      },
      {
        country: "카페/간식",
        litres: mccdata2.cafe,
      },
      {
        country: "편의점/마트/잡화",
        litres: mccdata2.mart,
      },
      {
        country: "취미/여가",
        litres: mccdata2.hobby,
      },
      {
        country: "술/유흥",
        litres: mccdata2.alchol,
      },
      {
        country: "보험/세금/기타금융",
        litres: mccdata2.cash,
      },
      {
        country: "기타",
        litres: mccdata2.etc,
      },
    ];

    var legend = chart.children.push(
      am5.Legend.new(root, {
        y: am5.percent(100),
        x: am5.percent(12),
        //centerX: am5.percent(5),
        layout: root.horizontalLayout,
        height: am5.percent(100),
      })
    );
    legend.data.setAll(chart.series.values);
    series1.data.setAll(data);
    // xAxis.data.setAll(data);

    series2.data.setAll(data2);
    xAxis.data.setAll(data2);
    yAxis.data.setAll(data2);

    series1.appear(1000);
    series2.appear(1000);
    chart.appear(1000, 100);
    return () => {
      // root가 존재하면 차트를 제거
      root && root.dispose();
    };
  });

  return <div id={id} style={{ width: "100%", height: "500px" }}></div>;
}

export default RadarChart;
