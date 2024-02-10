import React, { useRef, useEffect } from "react";

import * as am5 from "@amcharts/amcharts5";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
import { Box, Flex, Text } from "@chakra-ui/react";
import Card from "components/card/Card.js";

function BenefitTreemap(props) {
  const chartDiv = useRef(null);
  const { data, val } = props;
  useEffect(() => {
    if (chartDiv.current) {
      const root = am5.Root.new(chartDiv.current);
      root.setThemes([am5themes_Animated.new(root)]);
      const myTheme = am5.Theme.new(root);
      myTheme
        .rule("RoundedRectangle", ["hierarchy", "node", "shape", "depth1"])
        .setAll({
          strokeWidth: 10, //선 굵기
        });
      myTheme
        .rule("RoundedRectangle", ["hierarchy", "node", "shape", "depth2"])
        .setAll({
          strokeWidth: 1,
          strokeOpacity: 1,
        });

      root.setThemes([myTheme]);

      const container = root.container.children.push(
        am5.Container.new(root, {
          width: am5.percent(100),
          height: am5.percent(100),
          layout: root.verticalLayout,
        })
      );

      const series = container.children.push(
        am5hierarchy.Treemap.new(root, {
          data: data,
          sort: "descending",
          singleBranchOnly: true,
          downDepth: 1,
          upDepth: 0,
          initialDepth: 1,
          valueField: "value",
          categoryField: "name",
          childDataField: "children",
          layoutAlgorithm: "binary",
          nodePaddingOuter: 0,
          nodePaddingInner: 0,
          fillField: "color",
        })
      );

      /*
      배경색 지정
      *** 사용하시려면 하단의 series.data.setAll 부분에 color : "#FFFFFF" 형식으로 색상을 추가해야합니다.
      */
      series.rectangles.template.adapters.add("fill", function (fill, target) {
        var customColor = target.dataItem.dataContext.color;
        return customColor || fill;
      });

      /*
      툴팁(마우스 오버시 나오는 텍스트)
     
      var tooltip = am5.Tooltip.new(root, {
        autoTextColor: false, //자동 색상 지정 false
        getFillFromSprite: false,
        labelText: "{name.children}", //툴팁 내용
      });
      //툴팁 배경
      tooltip.get("background").setAll({
        fill: am5.color(0xffffff),
        fillOpacity: 0.8,
      });
      //툴팁 글씨 생상
      tooltip.label.setAll({
        //fill: "#4682B4",
        fill: "#000000",
      });
      series.set("tooltip", tooltip);
      */
      /*
      라벨(필드에 나타나는 텍스트)
      []태그를 활용해 bold, fontSize 설정 가능
      [/] 뒤 부터는 기본 폰트로 초기화
      */
      series.labels.template.setAll({
        text: "[bold;fontSize:16px;]{name}",
      });

      container.children.moveValue(
        am5hierarchy.BreadcrumbBar.new(root, {
          series: series,
        }),
        0
      );
      series.data.setAll(data);
      //컴포넌트가 언마운트되거나 data가 변경될 때 실행
      return () => {
        // root가 존재하면 차트를 제거
        root && root.dispose();
      };
    }
  }, [data]);

  return (
    <Card p="20px">
      <Flex direction={{ base: "column" }} justify="center">
        <Box mb={{ base: "1px", "2xl": "1px" }} position="relative">
          <Text fontSize="xl">{val}</Text>
          <div ref={chartDiv} style={{ width: "100%", height: "400px" }}></div>
        </Box>
      </Flex>
    </Card>
  );
}

export default BenefitTreemap;
