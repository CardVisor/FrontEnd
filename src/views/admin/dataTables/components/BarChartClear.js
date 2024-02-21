import React, { useEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

function BarChartClear(props) {
  const { id, mccdata1, mccdata2 } = props;
  useEffect(() => {
    var root = am5.Root.new(id);

    if (root._logo) {
      root._logo.dispose();
    }
    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    var chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        paddingLeft: 0,
        layout: root.verticalLayout,
      })
    );

    // Add legend
    // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
    var legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
      })
    );

    // Data
    var data = [
      {
        year: "식비",
        income: mccdata1.food,
        expenses: mccdata2.food,
      },
      {
        year: "생활",
        income: mccdata1.life,
        expenses: mccdata2.life,
      },
      {
        year: "교통/자동차",
        income: mccdata1.car,
        expenses: mccdata2.car,
      },
      {
        year: "쇼핑",
        income: mccdata1.shopping,
        expenses: mccdata2.shopping,
      },
      {
        year: "미용",
        income: mccdata1.beauty,
        expenses: mccdata2.beauty,
      },
      {
        year: "의료/건강/피트니스",
        income: mccdata1.fit,
        expenses: mccdata2.fit,
      },
      {
        year: "여행/숙박",
        income: mccdata1.travle,
        expenses: mccdata2.travle,
      },
      {
        year: "오락",
        income: mccdata1.play,
        expenses: mccdata2.play,
      },
      {
        year: "교육",
        income: mccdata1.edu,
        expenses: mccdata2.edu,
      },
      {
        year: "카페/간식",
        income: mccdata1.cafe,
        expenses: mccdata2.cafe,
      },
      {
        year: "주거/통신",
        income: mccdata1.home,
        expenses: mccdata2.home,
      },
      {
        year: "편의점/마트/잡화",
        income: mccdata1.mart,
        expenses: mccdata2.mart,
      },
      {
        year: "취미/여가",
        income: mccdata1.hobby,
        expenses: mccdata2.hobby,
      },
      {
        year: "술/유흥",
        income: mccdata1.alchol,
        expenses: mccdata2.alchol,
      },
      {
        year: "보험/세금/기타금융",
        income: mccdata1.cash,
        expenses: mccdata2.cash,
      },
      {
        year: "기타",
        income: mccdata1.etc,
        expenses: mccdata2.etc,
      },
    ];

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "year",
        renderer: am5xy.AxisRendererY.new(root, {
          inversed: true,
          cellStartLocation: 0.1,
          cellEndLocation: 0.9,
          minorGridEnabled: true,
        }),
      })
    );

    yAxis.data.setAll(data);

    var xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, {
          strokeOpacity: 0.1,
          minGridDistance: 50,
        }),
        min: 0,
      })
    );

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    function createSeries(field, name) {
      var series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: name,
          xAxis: xAxis,
          yAxis: yAxis,
          valueXField: field,
          categoryYField: "year",
          sequencedInterpolation: true,
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: "horizontal",
            labelText: "[bold]{name}[/]\n{categoryY}: {valueX}",
          }),
        })
      );

      series.columns.template.setAll({
        height: am5.p100,
        strokeOpacity: 0,
      });

      series.bullets.push(function () {
        return am5.Bullet.new(root, {
          locationX: 1,
          locationY: 0.5,
          sprite: am5.Label.new(root, {
            centerY: am5.p50,
            text: "{valueX}",
            populateText: true,
          }),
        });
      });

      series.bullets.push(function () {
        return am5.Bullet.new(root, {
          locationX: 1,
          locationY: 0.5,
          sprite: am5.Label.new(root, {
            centerX: am5.p100,
            centerY: am5.p50,
            text: "{name}",
            fill: am5.color(0xffffff),
            populateText: true,
          }),
        });
      });

      series.data.setAll(data);
      series.appear();

      return series;
    }

    createSeries("income", "Income");
    createSeries("expenses", "Expenses");

    // Add legend
    // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
    var legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
      })
    );

    legend.data.setAll(chart.series.values);

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    var cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        behavior: "zoomY",
      })
    );
    cursor.lineY.set("forceHidden", true);
    cursor.lineX.set("forceHidden", true);

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 100);
    return () => {
      // root가 존재하면 차트를 제거
      root && root.dispose();
    };
  });
  return <div id={id} style={{ width: "100%", height: "500px" }}></div>;
}

export default BarChartClear;
