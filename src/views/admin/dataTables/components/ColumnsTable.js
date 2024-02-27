import {
  Center,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Grid,
  Box,
  GridItem,
} from "@chakra-ui/react";
import React, { useMemo, useEffect, useState } from "react";
import axios from "axios";

// Custom components
import Card from "components/card/Card";
export default function ColumnsTable(props) {
  const API_SERVER = process.env.REACT_APP_API_SERVER;
  const { clickedCardInfo, month } = props;

  const [card1Details, setCard1Details] = useState({
    payTotal: null,
    male: null,
    custNum: null,
    majorAge: null,
    female: null,
    benefits: null,
    compTotalPayPercentage: null,
    compCustNum: null,
  });

  const [card2Details, setCard2Details] = useState({
    payTotal: null,
    male: null,
    custNum: null,
    majorAge: null,
    female: null,
    benefits: null,
    compTotalPayPercentage: null,
    compCustNum: null,
  });

  const card1 = clickedCardInfo[0] ? clickedCardInfo[0] : {};
  const card2 = clickedCardInfo[1] ? clickedCardInfo[1] : {};

  const cardType1 = card1.cardType;
  const cardType2 = card2.cardType;

  // 1번카드 카드 타입
  useEffect(() => {
    console.log({ cardType1 });
    console.log({ month });
    axios({
      method: "get",
      url:
        API_SERVER +
        `/CardCluster/CardDetails?type=${cardType1}&month=${month}`,
    })
      .then((res) => {
        setCard1Details({
          payTotal: res.data.payTotal,
          male: res.data.남,
          custNum: res.data.custNum,
          majorAge: res.data.majorAge,
          female: res.data.여,
          benefits: res.data.benefits,
          compTotalPayPercentage: res.data.compTotalPayPercentage,
          compCustNum: res.data.compCustNum,
          beforeTotalPay: res.data.beforeTotalPay,
          beforeCustNum: res.data.beforeCustNum,
          maleCnt: res.data.maleCnt,
          femaleCnt: res.data.femaleCnt,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [cardType1, month]);

  // 2번카드 카드 타입
  useEffect(() => {
    axios({
      method: "get",
      url:
        API_SERVER +
        `/CardCluster/CardDetails?type=${cardType2}&month=${month}`,
    })
      .then((res) => {
        setCard2Details({
          payTotal: res.data.payTotal,
          male: res.data.남,
          custNum: res.data.custNum,
          majorAge: res.data.majorAge,
          female: res.data.여,
          benefits: res.data.benefits,
          compTotalPayPercentage: res.data.compTotalPayPercentage,
          compCustNum: res.data.compCustNum,
          beforeTotalPay: res.data.beforeTotalPay,
          beforeCustNum: res.data.beforeCustNum,
          maleCnt: res.data.maleCnt,
          femaleCnt: res.data.femaleCnt,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [cardType2, month]);

  // 고객 수 비교
  const custNum1 =
    card1Details && card1Details.custNum
      ? parseInt(card1Details.custNum.replace(/,/g, ""))
      : 0;
  const custNum2 =
    card2Details && card2Details.custNum
      ? parseInt(card2Details.custNum.replace(/,/g, ""))
      : 0;

  // 남자 고객수 비교
  const maleNum1 =
    card1Details && card1Details.maleCnt
      ? parseInt(card1Details.maleCnt.replace(/,/g, ""))
      : 0;
  const maleNum2 =
    card2Details && card2Details.maleCnt
      ? parseInt(card2Details.maleCnt.replace(/,/g, ""))
      : 0;

  // 여자 고객수 비교
  const femaleNum1 =
    card1Details && card1Details.femaleCnt
      ? parseInt(card1Details.femaleCnt.replace(/,/g, ""))
      : 0;
  const femaleNum2 =
    card2Details && card2Details.femaleCnt
      ? parseInt(card2Details.femaleCnt.replace(/,/g, ""))
      : 0;

  // 전월 총 이용고객수
  const bcustNum1 =
    card1Details && card1Details.beforeCustNum
      ? parseInt(card1Details.beforeCustNum.replace(/,/g, ""))
      : 0;
  const bcustNum2 =
    card2Details && card2Details.beforeCustNum
      ? parseInt(card2Details.beforeCustNum.replace(/,/g, ""))
      : 0;

  // 총 결제 금액
  const totalPayNum1 =
    card1Details && card1Details.payTotal
      ? parseInt(card1Details.payTotal.replace(/,/g, ""))
      : 0;
  const totalPayNum2 =
    card2Details && card2Details.payTotal
      ? parseInt(card2Details.payTotal.replace(/,/g, ""))
      : 0;

  // 전월 총 결제 금액
  const bTotalPayNum1 =
    card1Details && card1Details.beforeTotalPay
      ? parseInt(card1Details.beforeTotalPay.replace(/,/g, ""))
      : 0;
  const bTotalPayNum2 =
    card2Details && card2Details.beforeTotalPay
      ? parseInt(card2Details.beforeTotalPay.replace(/,/g, ""))
      : 0;

  // 두 카드의 고객 수 차이를 계산합니다.
  const diff = Math.abs(custNum1 - custNum2);
  const maleDiff = Math.abs(maleNum1 - maleNum2);
  const femaleDiff = Math.abs(femaleNum1 - femaleNum2);
  const bcustNumDiff = Math.abs(bcustNum1 - bcustNum2);
  const payDiff = Math.abs(totalPayNum1 - totalPayNum2);
  const bPayDiff = Math.abs(bTotalPayNum1 - bTotalPayNum2);

  const formatNumber = (number) => {
    if (number > 0) {
      return new Intl.NumberFormat("ko-KR").format(number);
    } else if (number === 0) {
      return number;
    }
  };

  const unicodeChar = String.fromCharCode(0x25b2);

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  return (
    <Card
      direction="column"
      w="100%"
      px="0px"
      overflowX={{ sm: "scroll", lg: "hidden" }}
    >
      <Flex px="25px" justify="space-between" mb="20px" align="center">
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
          textAlign="center"
          //backgroundColor={"#5E3AFF"}
        >
          {month} 기준 요약 데이터 비교
        </Text>
      </Flex>

      <Grid templateColumns="repeat(3, 1fr)" gap={1} mb="30px" mt="20px">
        <GridItem colSpan={1}>
          <Flex direction="row" justify="flex-end">
            {custNum1 > custNum2 && (
              <Text color="green" mr="20px" fontWeight="600">
                {unicodeChar} {diff}
              </Text>
            )}
            <Text>{card1Details.custNum}</Text>
          </Flex>
        </GridItem>

        <GridItem colSpan={1}>
          <Box flex={0.5} textAlign="center">
            <Text fontSize="18" fontWeight="600">
              총 이용 고객 수
            </Text>
          </Box>
        </GridItem>

        <GridItem colSpan={1}>
          <Flex direction="row" justify="flex-start">
            <Text>{card2Details.custNum}</Text>
            {custNum2 > custNum1 && (
              <Text color="green" ml="20px" fontWeight="600">
                {diff} {unicodeChar}
              </Text>
            )}
          </Flex>
        </GridItem>
      </Grid>
      <Grid templateColumns="repeat(3, 1fr)" gap={1} mb="30px">
        <GridItem colSpan={1}>
          <Flex direction="row" justify="flex-end">
            {maleNum1 > maleNum2 && (
              <Text color="green" mr="20px" fontWeight="600">
                {unicodeChar} {maleDiff}
              </Text>
            )}
            <Text>{card1Details.maleCnt}</Text>
          </Flex>
        </GridItem>

        <GridItem colSpan={1}>
          <Box flex={0.5} textAlign="center">
            <Text fontSize="18" fontWeight="600">
              총 이용 고객 수 (남)
            </Text>
          </Box>
        </GridItem>

        <GridItem colSpan={1}>
          <Flex direction="row" justify="flex-start">
            <Text>{card2Details.maleCnt}</Text>
            {maleNum2 > maleNum1 && (
              <Text color="green" ml="20px" fontWeight="600">
                {maleDiff} {unicodeChar}
              </Text>
            )}
          </Flex>
        </GridItem>
      </Grid>
      <Grid templateColumns="repeat(3, 1fr)" gap={1} mb="30px">
        <GridItem colSpan={1}>
          <Flex direction="row" justify="flex-end">
            {femaleNum1 > femaleNum2 && (
              <Text color="green" mr="20px" fontWeight="600">
                {unicodeChar} {femaleDiff}
              </Text>
            )}
            <Text>{card1Details.femaleCnt}</Text>
          </Flex>
        </GridItem>

        <GridItem colSpan={1}>
          <Box flex={0.5} textAlign="center">
            <Text fontSize="18" fontWeight="600">
              총 이용 고객 수 (여)
            </Text>
          </Box>
        </GridItem>

        <GridItem colSpan={1}>
          <Flex direction="row" justify="flex-start">
            <Text>{card2Details.femaleCnt}</Text>
            {femaleNum2 > femaleNum1 && (
              <Text color="green" ml="20px" fontWeight="600">
                {femaleDiff} {unicodeChar}
              </Text>
            )}
          </Flex>
        </GridItem>
      </Grid>
      <Grid templateColumns="repeat(3, 1fr)" gap={1} mb="30px">
        <GridItem colSpan={1}>
          <Flex direction="row" justify="flex-end">
            {bcustNum1 > bcustNum2 && (
              <Text color="green" mr="20px" fontWeight="600">
                {unicodeChar} {bcustNumDiff}
              </Text>
            )}
            <Text>{card1Details.beforeCustNum}</Text>
          </Flex>
        </GridItem>

        <GridItem colSpan={1}>
          <Box flex={0.5} textAlign="center">
            <Text fontSize="18" fontWeight="600">
              전월 기준 총 이용 고객 수
            </Text>
          </Box>
        </GridItem>

        <GridItem colSpan={1}>
          <Flex direction="row" justify="flex-start">
            <Text>{card2Details.beforeCustNum}</Text>
            {bcustNum2 > bcustNum1 && (
              <Text color="green" ml="20px" fontWeight="600">
                {bcustNumDiff} {unicodeChar}
              </Text>
            )}
          </Flex>
        </GridItem>
      </Grid>
      <Grid templateColumns="repeat(3, 1fr)" gap={1} mb="30px">
        <GridItem colSpan={1}>
          <Flex direction="row" justify="flex-end">
            {totalPayNum1 > totalPayNum2 && (
              <Text color="green" mr="20px" fontWeight="600">
                {unicodeChar} {formatNumber(payDiff)}
              </Text>
            )}
            <Text>{card1Details.payTotal}</Text>
          </Flex>
        </GridItem>

        <GridItem colSpan={1}>
          <Box flex={0.5} textAlign="center">
            <Text fontSize="18" fontWeight="600">
              총 결제 금액
            </Text>
          </Box>
        </GridItem>

        <GridItem colSpan={1}>
          <Flex direction="row" justify="flex-start">
            <Text>{card2Details.payTotal}</Text>
            {totalPayNum2 > totalPayNum1 && (
              <Text color="green" ml="20px" fontWeight="600">
                {formatNumber(payDiff)} {unicodeChar}
              </Text>
            )}
          </Flex>
        </GridItem>
      </Grid>
      <Grid templateColumns="repeat(3, 1fr)" gap={1} mb="30px">
        <GridItem colSpan={1}>
          <Flex direction="row" justify="flex-end">
            {bTotalPayNum1 > bTotalPayNum2 && (
              <Text color="green" mr="20px" fontWeight="600">
                {unicodeChar} {formatNumber(bPayDiff)}
              </Text>
            )}
            <Text>{card1Details.beforeTotalPay}</Text>
          </Flex>
        </GridItem>

        <GridItem colSpan={1}>
          <Box flex={0.5} textAlign="center">
            <Text fontSize="18" fontWeight="600">
              전월 기준 총 결제 금액
            </Text>
          </Box>
        </GridItem>

        <GridItem colSpan={1}>
          <Flex direction="row" justify="flex-start">
            <Text>{card2Details.beforeTotalPay}</Text>
            {bTotalPayNum2 > bTotalPayNum1 && (
              <Text color="green" ml="20px" fontWeight="600">
                {formatNumber(bPayDiff)} {unicodeChar}
              </Text>
            )}
          </Flex>
        </GridItem>
      </Grid>
      <Grid templateColumns="repeat(3, 1fr)" gap={1} mb="30px">
        <GridItem colSpan={1}>
          <Box flex={1} textAlign="right">
            {card1Details.majorAge}
          </Box>
        </GridItem>

        <GridItem colSpan={1}>
          <Box flex={0.5} textAlign="center">
            <Text fontSize="18" fontWeight="600">
              주 사용 연령층
            </Text>
          </Box>
        </GridItem>

        <GridItem colSpan={1}>
          <Box flex={1} textAlign="left">
            {card2Details.majorAge}
          </Box>
        </GridItem>
      </Grid>
      <Grid templateColumns="repeat(3, 1fr)" gap={1} mb="30px">
        <GridItem colSpan={1}>
          <Box flex={1} textAlign="right">
            {formatNumber(card1.card_annual_fee)}
          </Box>
        </GridItem>

        <GridItem colSpan={1}>
          <Box flex={0.5} textAlign="center">
            <Text fontSize="18" fontWeight="600">
              연회비
            </Text>
          </Box>
        </GridItem>

        <GridItem colSpan={1}>
          <Box flex={1} textAlign="left">
            {formatNumber(card2.card_annual_fee)}
          </Box>
        </GridItem>
      </Grid>
    </Card>
  );
}
