import React, { useRef, useLayoutEffect } from "react";

import * as am5 from "@amcharts/amcharts5";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
import { Container } from "@chakra-ui/react";

function BenefitTreemap({ data }) {
  const chartDiv = useRef(null);
  let root;
  useLayoutEffect(() => {
    if (chartDiv.current) {
      root = am5.Root.new(chartDiv.current);

      const myTheme = am5.Theme.new(root);

      myTheme
        .rule("RoundedRectangle", ["hierarchy", "node", "shape", "depth1"])
        .setAll({
          strokeWidth: 2,
        });

      myTheme
        .rule("RoundedRectangle", ["hierarchy", "node", "shape", "depth2"])
        .setAll({
          fillOpacity: 0,
          strokeWidth: 1,
          strokeOpacity: 0.2,
        });

      myTheme.rule("Label", ["node", "depth1"]).setAll({
        forceHidden: true,
      });

      myTheme.rule("Label", ["node", "depth2"]).setAll({
        fontSize: 10,
      });

      root.setThemes([am5themes_Animated.new(root), myTheme]);

      // Create wrapper container
      let container = root.container.children.push(
        am5.Container.new(root, {
          width: am5.percent(100),
          height: am5.percent(100),
          layout: root.verticalLayout,
        })
      );

      // 나머지 차트 설정 코드들...

      let series = container.children.push(
        am5hierarchy.Treemap.new(root, {
          sort: "descending",
          singleBranchOnly: false,
          downDepth: 1,
          upDepth: 0,
          initialDepth: 1,
          valueField: "value",
          categoryField: "name",
          childDataField: "children",
          nodePaddingOuter: 0,
          nodePaddingInner: 0,
        })
      );

      series.get("colors").set("step", 1);
      series.data.setAll(processData(data));
      series.set("selectedDataItem", series.dataItems[0]);

      // series.bullets.push(function (root, series, dataItem) {
      //   let depth = dataItem.get("depth");

      //   if (depth === 1) {
      //     let picture = am5.Picture.new(root, {
      //       src:
      //         "https://www.amcharts.com/wp-content/uploads/assets/logos/" +
      //         dataItem.dataContext.name.toLowerCase() +
      //         ".png",
      //       centerX: am5.p50,
      //       centerY: am5.p50,
      //       width: am5.percent(30),
      //       isMeasured: true,
      //     });

      //     picture.states.lookup("default").setAll({ opacity: 0.15 });

      //     return am5.Bullet.new(root, { sprite: picture });
      //   }
      // });

      container.children.moveValue(
        am5hierarchy.BreadcrumbBar.new(root, {
          series: series,
        }),
        0
      );

      // 나머지 차트 설정 코드들...
    }

    return () => {
      if (root) {
        root.dispose();
      }
    };
  }, [data]);

  return <div ref={chartDiv} style={{ width: "100%", height: "500px" }}></div>;
}

function processData(data) {
  let treeData = [];

  am5.object.eachOrdered(
    data,
    (brand) => {
      let brandData = { name: brand, children: [] };
      let brandTotal = 0;
      for (var model in data[brand]) {
        brandTotal += data[brand][model];
      }

      for (var model in data[brand]) {
        // do not add very small
        if (data[brand][model] > 100) {
          brandData.children.push({ name: model, value: data[brand][model] });
        }
      }

      // only bigger brands
      if (brandTotal > 20) {
        treeData.push(brandData);
      }
    },
    (a, b) => {
      let aval = 0;
      let bval = 0;
      am5.object.each(data[a], (key, val) => (aval += val));
      am5.object.each(data[b], (key, val) => (bval += val));
      if (aval > bval) return -1;
      if (aval < bval) return 1;
      return 0;
    }
  );

  return [
    {
      name: "ALL TYPE",
      children: treeData,
    },
  ];
}

export default BenefitTreemap;
