import React, { useEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

function BarChart(props) {
  const { id, mccdata1, mccdata2 } = props;
  useEffect(() => {
    var root = am5.Root.new(id);

    if (root._logo) {
      root._logo.dispose();
    }

    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    var chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        layout: root.verticalLayout,
        arrangeTooltips: false,
        paddingLeft: 0,
        paddingRight: 10,
      })
    );

    // Use only absolute numbers
    chart.getNumberFormatter().set("numberFormat", "#.#s");

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
        age: "식비",
        male: mccdata1.food,
        female: mccdata2.food,
      },
      {
        age: "생활",
        male: mccdata1.life,
        female: mccdata2.life,
      },
      {
        age: "교통/자동차",
        male: mccdata1.car,
        female: mccdata2.car,
      },
      {
        age: "쇼핑",
        male: mccdata1.shopping,
        female: mccdata2.shopping,
      },
      {
        age: "미용",
        male: mccdata1.beauty,
        female: mccdata2.beauty,
      },
      {
        age: "의료/건강/피트니스",
        male: mccdata1.fit,
        female: mccdata2.fit,
      },
      {
        age: "여행/숙박",
        male: mccdata1.travle,
        female: mccdata2.travle,
      },
      {
        age: "오락",
        male: mccdata1.play,
        female: mccdata2.play,
      },
      {
        age: "교육",
        male: mccdata1.edu,
        female: mccdata2.edu,
      },
      {
        age: "카페/간식",
        male: mccdata1.cafe,
        female: mccdata2.cafe,
      },
      {
        age: "주거/통신",
        male: mccdata1.home,
        female: mccdata2.home,
      },
      {
        age: "편의점/마트/잡화",
        male: mccdata1.mart,
        female: mccdata2.mart,
      },
      {
        age: "취미/여가",
        male: mccdata1.hobby,
        female: mccdata2.hobby,
      },
      {
        age: "술/유흥",
        male: mccdata1.alchol,
        female: mccdata2.alchol,
      },
      {
        age: "보험/세금/기타금융",
        male: mccdata1.cash,
        female: mccdata2.cash,
      },
      {
        age: "기타",
        male: mccdata1.etc,
        female: mccdata2.etc,
      },
    ];

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "age",
        renderer: am5xy.AxisRendererY.new(root, {
          inversed: true,
          cellStartLocation: 0.1,
          cellEndLocation: 0.9,
          minorGridEnabled: true,
          minGridDistance: 20,
        }),
      })
    );

    yAxis.data.setAll(data);

    var xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 60,
          strokeOpacity: 0.1,
        }),
      })
    );

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    function createSeries(field, labelCenterX, pointerOrientation, rangeValue) {
      var series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          xAxis: xAxis,
          yAxis: yAxis,
          valueXField: field,
          categoryYField: "age",
          sequencedInterpolation: true,
          clustered: true,
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: pointerOrientation,
            labelText: "{categoryY}: {valueX}",
          }),
        })
      );

      series.columns.template.setAll({
        height: am5.p100,
        strokeOpacity: 0,
        fillOpacity: 0.8,
      });

      series.bullets.push(function () {
        return am5.Bullet.new(root, {
          // locationX: 1,
          // locationY: 0.5,
          // sprite: am5.Label.new(root, {
          //   centerY: am5.p50,
          //   text: "{valueX}",
          //   populateText: true,
          //   centerX: labelCenterX,
          // }),
        });
      });

      series.data.setAll(data);
      series.appear();

      var rangeDataItem = xAxis.makeDataItem({
        value: rangeValue,
      });
      xAxis.createAxisRange(rangeDataItem);
      rangeDataItem.get("grid").setAll({
        strokeOpacity: 0,
        stroke: series.get("stroke"),
      });

      // male female
      //   var label = rangeDataItem.get("label");
      //   label.setAll({
      //     text: field.toUpperCase(),
      //     fontSize: "1.5em",
      //     fill: series.get("stroke"),
      //     paddingTop: 10,
      //     isMeasured: false,
      //     centerX: labelCenterX,
      //   });
      //   label.adapters.add("dy", function () {
      //     return -chart.plotContainer.height();
      //   });

      return series;
    }

    createSeries("male", am5.p100, "right", 1);
    createSeries("female", 0, "left", 1);

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

export default BarChart;
