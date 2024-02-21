import React, { useEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5radar from "@amcharts/amcharts5/radar";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

function CardMccTest(props) {
  const { chartId, data } = props;
  useEffect(() => {
    var root = am5.Root.new(chartId);

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

    cursor.lineY.set("visible", false);

    // Create axes and their renderers
    // https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_axes
    var xRenderer = am5radar.AxisRendererCircular.new(root, {});
    xRenderer.labels.template.setAll({
      radius: 10,
    });

    var xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0,
        categoryField: "country",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {}),
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
        //renderer: am5radar.AxisRendererRadial.new(root, {}),
      })
    );

    // Create series
    // https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_series
    var series = chart.series.push(
      am5radar.RadarLineSeries.new(root, {
        fill: "#5E3AFF",
        name: "Series",
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
      strokeWidth: 2,
      stroke: "#5E3AFF",
    });

    series.bullets.push(function () {
      return am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          radius: 5,
          fill: series.get("fill"),
        }),
      });
    });

    // Set data
    // https://www.amcharts.com/docs/v5/charts/radar-chart/#Setting_data
    var chartData = [];

    data.forEach(function (item, index) {
      chartData.push({
        country: item.category,
        litres: item.value,
      });
    });
    series.data.setAll(chartData);
    xAxis.data.setAll(chartData);

    // Animate chart and series in
    // https://www.amcharts.com/docs/v5/concepts/animations/#Initial_animation
    series.appear(1000);
    //chart.appear(1000, 100);
    return () => {
      // root가 존재하면 차트를 제거
      root && root.dispose();
    };
  }, [data]);
  return <div id={chartId} style={{ width: "100%", height: "100%" }}></div>;
}

export default CardMccTest;
