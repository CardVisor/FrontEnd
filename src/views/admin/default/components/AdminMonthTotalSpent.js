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
import LineChart from "components/charts/LineChart";
import React, { createContext, useContext, useEffect, useState } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import Menu from "./AdminMainMenu";
import { MdOutlineCalendarToday } from "react-icons/md";
// Assets
import { RiArrowUpSFill } from "react-icons/ri";

import axios from "axios";

export const TotalSpentcontext = createContext();
export const TotalProvider = (props) => {
  var data1 = [];
  var lastmonthdata = [];
  var month = [];
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue("secondarybody.800", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const iconColor = useColorModeValue("brand.500", "white");
  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const [pertotal, setPerTotal] = useState();
  const [increse, setIncrese] = useState();
  const [lineChartOptionsTotalSpent, setOptionLineChart] = useState({});
  const [lineChartDataTotalSpent, setLineChartDataTotalSpent] = useState([]);
  const bgHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );

  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );
  const [memo, setMemo] = useState();
  const [checkstat, setCheckstat] = useState(false);
  // 6개월간 총결제내역 작년 올해 비교 상승률
  const formatpercent = (number) => {
    // Check if the input is a valid number
    if (typeof number === "number") {
      // Perform formatting based on the sign of the number
      if (number > 0) {
        return "+" + number.toFixed(0) + "%"; // Using toFixed to format to two decimal places
      } else if (number < 0) {
        return "-" + Math.abs(number).toFixed(1) + "%"; // Using Math.abs to handle negative numbers
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
  //     url: "/main/perMonthTotalAmount",
  //   })
  //     .then((res) => {

  //     })
  //     .catch((err) => {
  //       console.log("Error fetching currency data:", err);
  //     });
  // });
  // useEffect(() => {
  //   axios({
  //     method: "get",
  //     url: "",
  //   })
  //     .then((res) => {
  //       setIncrese(res.data);
  //       let Message = "백만원 기준 6개월간 매달 결제금액을 나타낸 차트입니다.";
  //       setMemo(Message);
  //     })
  //     .catch((err) => {
  //       console.log("Error fetching currency data:", err);
  //     });
  // });

  useEffect(() => {
    setCheckstat(false);
    axios
      .all([
        axios.get("/main/selectLastYearPerMonthamount"),
        axios.get("/main/selectPerMonthamount"),
        axios.get("/main/perMonthTotalAmount"),
        axios.get("/main/totalIncrese"),
      ])
      .then(
        axios.spread((res1, res2, res3, res4) => {
          setPerTotal(res3.data);
          setIncrese(res4.data);
          let Message =
            "백만원 기준 6개월간 매달 결제금액을 나타낸 차트입니다.";
          setMemo(Message);
          const monthname = res2.data.map((item) => item.month);

          const formattedMonths = monthname.map((month) => {
            const [year, monthNumber] = month.split("-");
            return monthNumber + "월";
          });

          month = formattedMonths;

          const formattedNumbers1 = res2.data.map((item) => {
            if (item.total_amount >= 1000000) {
              return (item.total_amount / 1000000).toFixed(1); // Convert to millions and append 'M'
            } else {
              return item.total_amount.toLocaleString(); // Format number with comma separators
            }
          });
          data1 = formattedNumbers1; //data

          const formattedNumbers = res1.data.map((item) => {
            if (item.total_amount >= 1000000) {
              return (item.total_amount / 1000000).toFixed(2); // Convert to millions and append 'M'
            } else {
              return item.total_amount.toLocaleString(); // Format number with comma separators
            }
          });
          lastmonthdata = formattedNumbers; //lastmonthdata
        })
      )
      .then(() => {
        const lineChartDataTotalSpent1 = [
          {
            name: "올해",
            data: data1,
          },
          {
            name: "작년",
            data: lastmonthdata,
          },
        ];

        setLineChartDataTotalSpent(lineChartDataTotalSpent1);
        const lineChartOptionsTotalSpent1 = {
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
            categories: month,
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
        setOptionLineChart(lineChartOptionsTotalSpent1);
        setCheckstat(true);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      {checkstat && (
        <TotalSpentcontext.Provider
          value={{
            memo,
            month,
            lineChartOptionsTotalSpent,
            increse,
            lineChartDataTotalSpent,
            formatpercent,
            textColor,
            pertotal,
            formatabroad,
            textColorSecondary,
            boxBg,
            iconColor,
            bgButton,
            bgHover,
            bgFocus,
          }}
        >
          {props.children}
        </TotalSpentcontext.Provider>
      )}
    </>
  );
};
export default function AdminMonthTotalSpent({ handleToggle }) {
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
    memo,
    textColor,
    formatabroad,
    increse,
    lineChartOptionsTotalSpent,
    formatpercent,
    lineChartDataTotalSpent,
    pertotal,
    textColorSecondary,
    boxBg,
  } = useContext(TotalSpentcontext);

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
          This Month
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
            {formatabroad(pertotal)}
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
          {lineChartDataTotalSpent.length > 0 &&
            lineChartOptionsTotalSpent.xaxis &&
            lineChartOptionsTotalSpent.xaxis.categories.length > 0 && (
              <LineChart
                chartData={lineChartDataTotalSpent}
                chartOptions={lineChartOptionsTotalSpent}
              />
            )}
        </Box>
      </Flex>
    </>
  );
}
