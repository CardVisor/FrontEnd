import {
  Text,
  useColorModeValue,
  Select,
  Spinner,
  Box,
  Heading,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AgeData from "./AgeData";

export default function Projects(props) {
  const API_SERVER = process.env.REACT_APP_API_SERVER;
  //상태 변수
  const [filter, setFilter] = useState("all");
  const [data, setData] = useState([]);
  const [averageAge, setAverageAge] = useState(null); // 평균 연령을 저장할 상태 추가
  const [averageSalary, setAverageSalary] = useState(null); //평균 연봉을 저장할 상태 추가
  const [averagePayment, setAveragePayment] = useState(null); // 평균 소비 금액을 저장할 상태 추가
  const [topCards, setTopCards] = useState(null); // 가장 많이 사용한 카드를 저장할 상태 추가
  const [topMccCodes, setTopMccCodes] = useState(null); // 주 사용처를 저장할 상태 추가
  const [loading, setLoading] = useState(false); //로딩 스피너 사용을 위한 로딩 상태를 나타내는 상태 변수 추가

  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );

  useEffect(() => {
    setLoading(true); // API 요청 시작 전에 로딩 상태를 true로 설정

    axios
      .get(API_SERVER + "/customer/genderInfo")
      .then((response) => {
        const data = response.data;

        const endpoint = filter === "all" ? "total" : filter;
        const genderKey =
          filter === "all" ? "all" : filter === "male" ? "남" : "여";
        const salaryKey =
          filter === "all" ? "all" : filter === "male" ? "male" : "female";

        setData(data.customerStats[endpoint]);
        setAverageAge(
          data.custAverages[
            filter === "all"
              ? "totalAverageAge"
              : filter === "male"
              ? "남AverageAge"
              : "여AverageAge"
          ]
        );
        setAverageSalary(data.mostCommonSalaries[salaryKey]);
        setAveragePayment(data.averagePaymentAmountInKRW[genderKey]);
        setTopCards(data.top3CardTypesByGender[genderKey]);
        setTopMccCodes(data.top3MccCodeByGender[genderKey]);

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setLoading(false);
      });
  }, [filter]);

  // 필터를 변경하는 함수입니다.
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // 나머지 코드...

  return (
    <>
      <Card mb={{ base: "0px", "2xl": "20px" }}>
        {loading ? (
          <Spinner />
        ) : (
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div>
                <Text
                  color={textColorPrimary}
                  fontWeight="bold"
                  fontSize="2xl"
                  mt="10px"
                  mb="4px"
                  mr="10px"
                >
                  All DATA{" "}
                  <Text
                    as="span"
                    color={textColorSecondary}
                    fontSize="md"
                    ml="10px"
                  >
                    종합데이터
                  </Text>
                </Text>
              </div>
              <div>
                <Select
                  value={filter}
                  onChange={handleFilterChange}
                  borderColor="blue.500"
                >
                  <option value="all">All</option>
                  <option value="male">남성</option>
                  <option value="female">여성</option>
                </Select>
              </div>
            </div>
            <Stack divider={<StackDivider />} spacing="3" mt="20px">
              <Box>
                <Heading size="s" textTransform="uppercase">
                  포함된 고객 수 : {data}명
                </Heading>
              </Box>
              <Box>
                <Heading size="s" textTransform="uppercase">
                  평균 연령 : {averageAge}세
                </Heading>
              </Box>
              <Box>
                <Heading size="s" textTransform="uppercase">
                  평균 연봉 : {averageSalary}
                </Heading>
              </Box>
              <Box>
                <Heading size="s" textTransform="uppercase">
                  평균 소비금액 : {averagePayment}
                </Heading>
              </Box>
              <Box>
                <Heading size="s" textTransform="uppercase">
                  가장 많이 사용한 카드 : {topCards && topCards.join(", ")}
                </Heading>
              </Box>
              <Box>
                <Heading size="s" textTransform="uppercase">
                  주 사용처 : {topMccCodes && topMccCodes.join(", ")}
                </Heading>
              </Box>
            </Stack>
          </div>
        )}
      </Card>
    </>
  );
}
