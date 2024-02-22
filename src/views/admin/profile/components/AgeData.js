import { Text, useColorModeValue, Select, Spinner, Stack, StackDivider, Box, Heading } from "@chakra-ui/react";
import Card from "components/card/Card.js";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AgeData(props) {
  //상태 변수
  const [filter, setFilter] = useState("all");
  const [data, setData] = useState([]);
  const [averageAgeGroups, setAverageAgeGroups] = useState(null); // 평균 연령을 저장할 상태 추가
  const [topSalaryByAgeRange, setTopSalaryByAgeRange] = useState(null); //평균 연봉을 저장할 상태 추가
  const [averageByAgeRange, setAverageByAgeRange] = useState(null); // 평균 소비 금액을 저장할 상태 추가
  const [topCardsAgeRange, setTopCardsAgeRange] = useState(null);
  const [alltop3CardTypes, setAlltop3CardTypes] = useState(null);
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

    Promise.all([
      axios.get("/customer/ageGroup"),
      axios.get("customer/averageAgeGroups"),
      axios.get("/customer/topSalaryByAgeRange"),
      axios.get("/customer/averageByAgeRange"),
      axios.get("/customer/alltop3CardTypes"),
      axios.get("/customer/top3MccCodeByAgeRange"),
    ])
      .then(
        ([
          ageGroupResponse,
          averageAgeGroupsResponse,
          topSalaryByAgeRangeResponse,
          averageByAgeRangeResponse,
          alltop3CardTypesResponse,
          topMccCodesResponse,
        ]) => {
          setAlltop3CardTypes(alltop3CardTypesResponse.data);
          const selectedCards = alltop3CardTypesResponse.data.filter(
            (card) => card.ageRange === filter
          );

          setData(ageGroupResponse.data[filter]);
          setAverageAgeGroups(averageAgeGroupsResponse.data[filter]);
          setTopSalaryByAgeRange(
            topSalaryByAgeRangeResponse.data.find((row) => row[0] === filter)[1]
          );
          setAverageByAgeRange(
            averageByAgeRangeResponse.data.find(
              (row) => row.age_range === filter
            )?.pay_amount || "데이터가 없습니다."
          );
          setTopCardsAgeRange(selectedCards);
          setTopMccCodes(topMccCodesResponse.data);
          setLoading(false); // 모든 요청이 완료되었으므로 로딩 상태를 false로 설정
        }
      )
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setLoading(false); // 요청 중 오류가 발생하면 로딩 상태를 false로 설정
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
                  <option value="20대">20대</option>
                  <option value="30대">30대</option>
                  <option value="40대">40대</option>
                  <option value="50대">50대</option>
                  <option value="60대">60대</option>
                  <option value="70대 이상">70대 이상</option>
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
              평균 연령 : {averageAgeGroups}세
              </Heading>
            </Box>
            <Box>
              <Heading size="s" textTransform="uppercase">
              평균 연봉 : {topSalaryByAgeRange}
              </Heading>
            </Box>
            <Box>
              <Heading size="s" textTransform="uppercase">
              평균 소비금액 : {averageByAgeRange}
              </Heading>
            </Box>
            <Box>
              <Heading size="s" textTransform="uppercase">
              가장 많이 사용한 카드 :{" "}
              {topCardsAgeRange &&
                topCardsAgeRange.map((card) => card.cardName).join(", ")}{" "}
              </Heading>
            </Box>
            <Box>
              <Heading size="s" textTransform="uppercase">
              주 사용처 :{" "}
              {topMccCodes &&
                topMccCodes
                  .filter((code) => code[0] === filter)
                  .map((code) => code[1])
                  .join(", ")}
              </Heading>
            </Box>
            </Stack>
          </div>
        )}
      </Card>
    </>
  );
}
