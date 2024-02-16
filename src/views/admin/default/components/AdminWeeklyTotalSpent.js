// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import React, { createContext, useContext, useEffect, useState } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { MdOutlineCalendarToday } from "react-icons/md";
// Assets
import { RiArrowUpSFill } from "react-icons/ri";
import Menu from "./AdminMainMenu";
import axios from "axios";
import AdminLineChart from "./AdminLineChart";

export const TotalWeekSpentcontext = createContext();
export const TotalProvider = (props) => {
  var data = [];
  var lastweeklydata = [];
  var week = [];
  const [lineChartOptionsWeekTotalSpent, setOptionWeekLineChart] = useState({});
  const [lineChartDataWeekTotalSpent, setLineChartDataWeekTotalSpent] =
    useState([]);
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue("secondarybody.600", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  const [Weekpertotal, setWeekPerTotal] = useState();
  const [increse, setIncrese] = useState();
  const [memo, setMemo] = useState();
  const [checkstat, setCheckstat] = useState(false);
  // 6주간 총결제내역 작년 올해 비교 상승률
  const formatpercent = (number) => {
    // Check if the input is a valid number
    if (typeof number === "number") {
      // Perform formatting based on the sign of the number
      if (number > 0) {
        return "+" + number.toFixed(1) + "%"; // Using toFixed to format to two decimal places
      } else if (number < 0) {
        return "-" + Math.abs(number).toFixed(2) + "%"; // Using Math.abs to handle negative numbers
      } else {
        return "0.0%"; // Handle zero case
      }
    } else {
      return "Invalid input"; // Handle invalid input
    }
  };

  //총 결제내역 숫자바꾸기
  const formatabroad = (number) => {
    if (number !== undefined && number !== null) {
      if (number > 0) {
        if (number >= 100) {
          return `${(number / 100).toFixed(2)} 억`;
        } else {
          return `${number.toString()}만`;
        }
      } else {
        // Handle negative numbers if needed
        return `${number.toString()}`;
      }
    } else {
      return "N/A"; // Handle undefined or null case
    }
  };

  // 6개월간 총결제내역
  // useEffect(() => {
  //   axios({
  //     method: "get",
  //     url: "/main/perWeekTotalAmount",
  //   })
  //     .then((res) => {
  //       console.log(res.data);
  //       setWeekPerTotal(res.data);
  //     })
  //     .catch((err) => {
  //       console.log("Error fetching currency data:", err);
  //     });
  // }, []);
  // useEffect(() => {
  //   axios({
  //     method: "get",
  //     url: "/main/weektotalIncrese",
  //   })
  //     .then((res) => {
  //       console.log(res.data);
  //       setIncrese(res.data);
  //       let Message = "6주간 매주 결제금액을 나타낸 차트입니다.";
  //       setMemo(Message);
  //     })
  //     .catch((err) => {
  //       console.log("Error fetching currency data:", err);
  //     });
  // }, []);

  useEffect(() => {
    axios
      .all([
        axios.get("/main/selectPerWeeklyamount"),
        axios.get("/main/selectLastYearPerMonthamount"),
        axios.get("/main/weektotalIncrese"),
        axios.get("/main/perWeekTotalAmount"),
      ])
      .then(
        axios.spread((res1, res2, res3, res4) => {
          setWeekPerTotal(res4.data);
          setIncrese(res3.data);
          let Message = "6주간 매주 결제금액을 나타낸 차트입니다.";
          setMemo(Message);
          const weeklyname = res1.data.map((item) => item.week);
          week = weeklyname;
          const formattedweeknumber = res1.data.map((item) => {
            if (item.total_amount >= 1000000) {
              return (item.total_amount / 1000000).toFixed(2); // Convert to millions and append 'M'
            } else {
              return item.total_amount.toLocaleString(); // Format number with comma separators
            }
          });
          data = formattedweeknumber;
          const formattedweeknumbers = res2.data.map((item) => {
            if (item.total_amount >= 1000000) {
              return (item.total_amount / 1000000).toFixed(2); // Convert to millions and append 'M'
            } else {
              return item.total_amount.toLocaleString(); // Format number with comma separators
            }
          });
          lastweeklydata = formattedweeknumbers; //lastmonthdata
        })
      )
      .then(() => {
        const lineChartDataTotalSpent2 = [
          {
            name: "올해",
            data: data,
          },
          {
            name: "작년",
            data: lastweeklydata,
          },
        ];
        setLineChartDataWeekTotalSpent(lineChartDataTotalSpent2);
        const lineChartOptionsTotalSpent2 = {
          chart: {
            toolbar: {
              show: false,
            },
            dropShadow: {
              enabled: true,
              top: 13,
              left: 0,
              blur: 10,
              opacity: 0.1,
              color: "#4318FF",
            },
          },
          colors: ["#4318FF", "#39B8FF"],
          markers: {
            size: 0,
            colors: "white",
            strokeColors: "#7551FF",
            strokeWidth: 3,
            strokeOpacity: 0.9,
            strokeDashArray: 0,
            fillOpacity: 1,
            discrete: [],
            shape: "circle",
            radius: 2,
            offsetX: 0,
            offsetY: 0,
            showNullDataPoints: true,
          },
          tooltip: {
            theme: "dark",
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "smooth",
            type: "line",
          },
          xaxis: {
            type: "numeric",
            categories: week,
            labels: {
              style: {
                colors: "#A3AED0",
                fontSize: "12px",
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
          },
          legend: {
            show: false,
          },
          grid: {
            show: false,
            column: {
              color: ["#7551FF", "#39B8FF"],
              opacity: 0.5,
            },
          },
          color: ["#7551FF", "#39B8FF"],
        };
        setOptionWeekLineChart(lineChartOptionsTotalSpent2);
        setCheckstat(true);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      {checkstat && (
        <TotalWeekSpentcontext.Provider
          value={{
            textColor,
            formatabroad,
            increse,
            lineChartOptionsWeekTotalSpent,
            formatpercent,
            lineChartDataWeekTotalSpent,
            Weekpertotal,
            textColorSecondary,
            boxBg,
            memo,
          }}
        >
          {props.children}
        </TotalWeekSpentcontext.Provider>
      )}
    </>
  );
};
export default function AdminWeeklyTotalSpent({ handleToggle }) {
  return (
    <Card
      justifyContent="center"
      align="center"
      direction="column"
      w="100%"
      mb="0px"
    >
      <TotalProvider>
        <DisplayTotal handleToggle={handleToggle}></DisplayTotal>
      </TotalProvider>
    </Card>
  );
}
export function DisplayTotal({ handleToggle }) {
  const {
    textColor,
    formatabroad,
    increse,
    lineChartOptionsWeekTotalSpent,
    formatpercent,
    lineChartDataWeekTotalSpent,
    Weekpertotal,
    textColorSecondary,
    boxBg,
    memo,
  } = useContext(TotalWeekSpentcontext);
  return (
    <>
      <Flex justify="space-between" align="center" w="100%">
        <Button
          bg={boxBg}
          fontSize="sm"
          fontWeight="500"
          color={textColorSecondary}
          borderRadius="7px"
          onClick={handleToggle}
        >
          <Icon
            as={MdOutlineCalendarToday}
            color={textColorSecondary}
            me="4px"
          />
          This Week
        </Button>
        <Menu memo={memo} />
      </Flex>
      <Flex w="100%" flexDirection={{ base: "column", lg: "row" }}>
        <Flex flexDirection="column" me="20px" mt="28px">
          <Text
            color={textColor}
            fontSize="34px"
            textAlign="start"
            fontWeight="700"
            lineHeight="100%"
          >
            {formatabroad(Weekpertotal)}
          </Text>
          <Flex align="center" mb="20px">
            <Text
              color="secondaryGray.600"
              fontSize="sm"
              fontWeight="500"
              mt="4px"
              me="12px"
            >
              총 결제내역
            </Text>
            <Flex align="center">
              <Icon as={RiArrowUpSFill} color="green.500" me="2px" mt="2px" />
              <Text color="green.500" fontSize="sm" fontWeight="700">
                {formatpercent(increse)}
              </Text>
            </Flex>
          </Flex>

          <Flex align="center">
            <Icon as={IoCheckmarkCircle} color="green.500" me="4px" />
            <Text color="green.500" fontSize="md" fontWeight="700">
              On track
            </Text>
          </Flex>
        </Flex>
        <Box minH="260px" minW="75%" mt="auto">
          {lineChartDataWeekTotalSpent.length > 0 &&
            lineChartOptionsWeekTotalSpent.xaxis &&
            lineChartOptionsWeekTotalSpent.xaxis.categories.length > 0 && (
              <AdminLineChart
                chartData={lineChartDataWeekTotalSpent}
                chartOptions={lineChartOptionsWeekTotalSpent}
              />
            )}
        </Box>
      </Flex>
    </>
  );
}
