import React, { useEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

function PieChartComponent(props) {
  const { chartId, data } = props;

  useEffect(() => {
    var root = am5.Root.new(chartId);

    if (root._logo) {
      root._logo.dispose();
    }

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
      })
    );

    // Create series
    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        alignLabels: true,
        calculateAggregates: true,
        valueField: "value",
        categoryField: "category",
      })
    );

    series.slices.template.setAll({
      strokeWidth: 3,
      stroke: am5.color(0xffffff),
    });

    series.labelsContainer.set("paddingTop", 30);

    series.ticks.template.set("forceHidden", true);
    series.labels.template.set("forceHidden", true);

    // Set up adapters for variable slice radius
    series.slices.template.adapters.add("radius", function (radius, target) {
      var dataItem = target.dataItem;
      var high = series.getPrivate("valueHigh");

      if (dataItem) {
        var value = target.dataItem.get("valueWorking", 0);
        return (radius * value) / high;
      }
      return radius;
    });

    series.data.setAll(props.data);

    //Create legend
    var legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
        marginTop: 15,
        marginBottom: 15,
      })
    );

    legend.data.setAll(series.dataItems);

    // Play initial series animation
    // series.appear(1000, 100);

    return () => {
      // root가 존재하면 차트를 제거
      root && root.dispose();
    };
  }, [data]);
  // [data]

  return <div id={chartId} style={{ width: "100%", height: "100%" }}></div>;
}

export default PieChartComponent;
