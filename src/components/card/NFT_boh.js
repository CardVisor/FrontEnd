// Chakra imports
import { Box, Flex } from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import axios from "axios";

// Assets
import React, { useState, useEffect } from "react";
import PieChartComponent from "views/admin/dataTables/components/CardMccChart";

export default function NFT(props) {
  const { cardId, cardType, month } = props;
  const [mccChartDataList, setMccChartDataList] = useState([]);

  useEffect(() => {
    axios
      .get(`CardCluster/MccCharts?month=${month}&type=${cardType}`)
      .then((response) => {
        const data = response.data.map((item) => ({
          value: item.total,
          category: item.ctg_name,
        }));
        setMccChartDataList(data);
        //console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, [cardType, month]);

  return (
    <Card p="10px">
      <Flex
        direction={{ base: "column" }}
        justify="center"
        align="center"
        style={{ height: "100%" }}
      >
        <Box
          mb={{ base: "1px", "2xl": "1px" }}
          position="relative"
          style={{ width: "100%", height: "100%" }}
        >
          {mccChartDataList.length > 0 && (
            <PieChartComponent
              chartId={cardId}
              data={mccChartDataList}
              style={{ width: "100%", height: "100%" }}
            />
          )}
          {/* <PieChartComponent
            chartId={cardId}
            data={mccChartDataList}
            style={{ width: "100%", height: "100%" }}
          /> */}
        </Box>
      </Flex>
    </Card>
  );
}
