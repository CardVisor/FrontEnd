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
import AdminModal from "./AdminModal";
import YourComponent from "views/admin/Recoil/AdminMonthRecoil";

export const TotalSpentcontext = createContext();
export const TotalProvider = (props) => {
  var month = [];
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue("secondarybody.800", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const [pertotal, setPerTotal] = useState();
  const [increse, setIncrese] = useState();

  const [memo, setMemo] = useState();
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
      return "로드중"; // Handle undefined or null case
    }
  };

  useEffect(() => {
    axios
      .all([
        axios.get("/main/perMonthTotalAmount"),
        axios.get("/main/totalIncrese"),
      ])
      .then(
        axios.spread((res1, res2) => {
          setPerTotal(res1.data);
          setIncrese(res2.data);
          let Message =
            "백만원 기준 6개월간 매달 결제금액을 나타낸 차트입니다.";
          setMemo(Message);
        })
      )
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <TotalSpentcontext.Provider
        value={{
          memo,
          month,
          increse,
          formatpercent,
          textColor,
          pertotal,
          formatabroad,
          textColorSecondary,
          boxBg,
        }}
      >
        {props.children}
      </TotalSpentcontext.Provider>
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
    formatpercent,
    pertotal,
    textColorSecondary,
    boxBg,
  } = useContext(TotalSpentcontext);

  return (
    <>
      {/* {showDetail ? (
      <div> */}
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
        <Flex display="flex">
          <AdminModal />

          <Menu memo={memo} />
        </Flex>
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
        <YourComponent />
      </Flex>
      {/* </div>
      ) : (<AdminDetailMonthTotalSpent/>) } */}
    </>
  );
}
