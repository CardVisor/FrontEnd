import React, { createContext, useContext, useEffect, useState } from "react";

// Chakra imports
import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import BarChart from "components/charts/BarChart";

// Custom components
import Card from "components/card/Card.js";
import Menu from "./AdminMainMenu";
// Assets
import axios from "axios";

export const WeekDetailTrafficContext = createContext();
export const TrafficProvider = (props) => {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const [total6transaction, setTotal6Transaction] = useState([]);
  var weektransaction = [];
  var week = [];
  const [barChartDataWeekTraffic, setBarChartDataWeekTraffic] = useState([]);
  const [barChartOptionsWeekTraffic, setBarChartOptionsWeekTraffic] = useState(
    []
  );
  const [memo, SetMemo] = useState();
  useEffect(() => {
    axios
      .all([
        axios.get("/main/detailselectWeektransaction"),
        axios.get("/main/detailselectPerWeeklytransaction"),
      ])
      .then(
        axios.spread((res1, res2) => {
          let Message = "12주간 매주 건수를 나타낸 차트입니다.";
          SetMemo(Message);
          setTotal6Transaction(res1.data);
          const weekname = res2.data.map((item) => item.week);
          week = weekname;
          weektransaction = res2.data.map((item) => item.transaction);
        })
      )
      .then(() => {
        const barChartDataMonthTraffic = [
          {
            name: "주간 거래건수",
            data: weektransaction,
          },
        ];
        setBarChartDataWeekTraffic(barChartDataMonthTraffic);
        const barChartOptionsDailyTraffic = {
          chart: {
            toolbar: {
              show: false,
            },
          },
          tooltip: {
            style: {
              fontSize: "12px",
              fontFamily: undefined,
            },
            onDatasetHover: {
              style: {
                fontSize: "12px",
                fontFamily: undefined,
              },
            },
            theme: "dark",
          },
          xaxis: {
            categories: week,
            show: false,
            labels: {
              show: true,
              style: {
                colors: "#A3AED0",
                fontSize: "14px",
                fontWeight: "500",
              },
            },
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
          },
          yaxis: {
            show: false,
            color: "black",
            labels: {
              show: true,
              style: {
                colors: "#CBD5E0",
                fontSize: "14px",
              },
            },
          },
          grid: {
            show: false,
            strokeDashArray: 5,
            yaxis: {
              lines: {
                show: true,
              },
            },
            xaxis: {
              lines: {
                show: false,
              },
            },
          },
          fill: {
            type: "gradient",
            gradient: {
              type: "vertical",
              shadeIntensity: 1,
              opacityFrom: 0.7,
              opacityTo: 0.9,
              colorStops: [
                [
                  {
                    offset: 0,
                    color: "#4318FF",
                    opacity: 1,
                  },
                  {
                    offset: 100,
                    color: "rgba(67, 24, 255, 1)",
                    opacity: 0.28,
                  },
                ],
              ],
            },
          },
          dataLabels: {
            enabled: false,
          },
          plotOptions: {
            bar: {
              borderRadius: 10,
              columnWidth: "40px",
            },
          },
        };
        setBarChartOptionsWeekTraffic(barChartOptionsDailyTraffic);
      })
      .catch((err) => {
        console.log("Error fetching currency data:", err);
      });
  }, []);
  return (
    <>
      <WeekDetailTrafficContext.Provider
        value={{
          memo,
          textColor,
          barChartDataWeekTraffic,
          barChartOptionsWeekTraffic,
          total6transaction,
        }}
      >
        {props.children}
      </WeekDetailTrafficContext.Provider>
    </>
  );
};

export default function AdminDetailWeeklyTraffic(props) {
  return (
    <Card align="center" direction="column" w="100%">
      <TrafficProvider>
        <AdminMonthTrafficDisplay></AdminMonthTrafficDisplay>
      </TrafficProvider>
    </Card>
  );
}

function AdminMonthTrafficDisplay(props) {
  const {
    memo,
    textColor,
    barChartDataWeekTraffic,
    barChartOptionsWeekTraffic,
    total6transaction,
  } = useContext(WeekDetailTrafficContext);

  return (
    <>
      <Flex justify="space-between" align="start" px="10px" pt="5px">
        <Flex flexDirection="column" align="start" me="20px">
          <Flex w="100%">
            <Text
              me="auto"
              color="secondaryGray.600"
              fontSize="sm"
              fontWeight="500"
            >
              주간 거래건수
            </Text>
          </Flex>
          <Flex align="end">
            <Text
              color={textColor}
              fontSize="34px"
              fontWeight="700"
              lineHeight="100%"
            >
              {total6transaction}
            </Text>
            <Text
              ms="6px"
              color="secondaryGray.600"
              fontSize="sm"
              fontWeight="500"
              display="flex"
              alignItems="center"
            >
              건
            </Text>
          </Flex>
        </Flex>
        <Menu memo={memo} />
      </Flex>
      <Box h="240px" mt="auto">
        {barChartDataWeekTraffic.length > 0 &&
          barChartOptionsWeekTraffic.xaxis &&
          barChartOptionsWeekTraffic.xaxis.categories.length > 0 && (
            <BarChart
              chartData={barChartDataWeekTraffic}
              chartOptions={barChartOptionsWeekTraffic}
            />
          )}
      </Box>
    </>
  );
}
