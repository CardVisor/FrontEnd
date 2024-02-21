import React, { useEffect, useState } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5radar from "@amcharts/amcharts5/radar";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

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
      // radius: 1,
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
          //openCategoryYField: false,
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
          //openCategoryYField: false,
          valueYField: "litres",
          categoryXField: "country",
          tooltip: am5.Tooltip.new(root, {
            labelText: "{valueY}",
          }),
        })
      );

      series.strokes.template.setAll({
        strokeWidth: 1,
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
        country: "식비",
        litres: mccdata1.food,
      },
      {
        country: "생활",
        litres: mccdata1.life,
      },
      {
        country: "교통/자동차",
        litres: mccdata1.car,
      },
      {
        country: "쇼핑",
        litres: mccdata1.shopping,
      },
      {
        country: "미용",
        litres: mccdata1.beauty,
      },
      {
        country: "의료/건강/피트니스",
        litres: mccdata1.fit,
      },
      {
        country: "여행/숙박",
        litres: mccdata1.travel,
      },
      {
        country: "오락",
        litres: mccdata1.play,
      },
    ];

    var data2 = [
      {
        country: "식비",
        litres: mccdata2.food,
      },
      {
        country: "생활",
        litres: mccdata2.life,
      },
      {
        country: "교통/자동차",
        litres: mccdata2.car,
      },
      {
        country: "쇼핑",
        litres: mccdata2.shopping,
      },
      {
        country: "미용",
        litres: mccdata2.beauty,
      },
      {
        country: "의료/건강/피트니스",
        litres: mccdata2.fit,
      },
      {
        country: "오락",
        litres: mccdata2.play,
      },
    ];

    var legend = chart.children.push(
      am5.Legend.new(root, {
        y: am5.percent(100),
        x: am5.percent(12),
        //centerX: am5.percent(5),
        layout: root.horizontalLayout,
        height: am5.percent(100),
        //fill: "#5E3AFF",
        // verticalScrollbar: am5.Scrollbar.new(root, {
        //   orientation: "vertical",
        // }),
      })
    );
    legend.data.setAll(chart.series.values);
    series1.data.setAll(data);
    // xAxis.data.setAll(data);

    series2.data.setAll(data2);
    xAxis.data.setAll(data2);
    //yAxis.data.setAll(data2);

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
