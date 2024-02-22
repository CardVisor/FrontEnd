import { Text, useColorModeValue, Select, Spinner } from "@chakra-ui/react";
import Card from "components/card/Card.js";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function JobData(props) {
  const [filter, setFilter] = useState("all");
  const [countByJobTypeAndAll, setCountByJobTypeAndAll] = useState(null);
  const [averageAgeByJobTypeAndAll, setAverageAgeByJobTypeAndAll] =
    useState(null);
  const [mostsalaryData, setMostsalaryData] = useState(null);
  const [paymentByJobTypeAndAll, setPaymentByJobTypeAndAll] = useState(null);
  const [topCardsByJobType, setTopCardsByJobType] = useState(null);
  const [findTop3CardTypesByJobType, setFindTop3CardTypesByJobType] =
    useState(null);
  const [loading, setLoading] = useState(false); //로딩 스피너 사용을 위한 로딩 상태를 나타내는 상태 변수 추가

  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );

  useEffect(() => {
    setLoading(true);

    Promise.all([
      axios.get("/customer/countByJobTypeAndAll"),
      axios.get("/customer/getAverageAgeByJobTypeAndAll"),
      axios.get("/customer/mostsalaryData"),
      axios.get("/customer/paymentByJobTypeAndAll"),
      axios.get("/customer/topCardsByJobType"),
      axios.get("/customer/findTop3CardTypesByJobType"),
    ])
      .then(
        ([
          countByJobTypeAndAllResponse,
          averageAgeByJobTypeAndAllResponse,
          mostsalaryDataResponse,
          paymentByJobTypeAndAllResponse,
          topCardsByJobTypeResponse,
          findTop3CardTypesByJobTypeResponse,
        ]) => {
          setCountByJobTypeAndAll(
            countByJobTypeAndAllResponse.data.find(
              (row) => row[0] === filter
            )[1]
          );
          setAverageAgeByJobTypeAndAll(
            averageAgeByJobTypeAndAllResponse.data.find(
              (row) => row[0] === filter
            )[1]
          );
          setMostsalaryData(
            mostsalaryDataResponse.data.find((row) => row[0] === filter)[1]
          );
          setPaymentByJobTypeAndAll(
            paymentByJobTypeAndAllResponse.data.find(
              (row) => row["job_type"] === filter
            )["avg_payment"]
          );

          const topCardsByJobTypeData =
            topCardsByJobTypeResponse.data.topCardsByJobType;
          const allCards = topCardsByJobTypeResponse.data.all;
          const topCardsByJob =
            filter === "all"
              ? allCards
              : topCardsByJobTypeData.find((row) => row[0] === filter);

          setTopCardsByJobType(
            topCardsByJob
              ? filter === "all"
                ? topCardsByJob
                : topCardsByJob.slice(1)
              : []
          );

          const mainUseData = findTop3CardTypesByJobTypeResponse.data;
          const mainUsesByJob =
            filter === "all"
              ? mainUseData
                  .filter((row) => row[0] === "all")
                  .map((row) => row[1])
              : mainUseData
                  .filter((row) => row[0] === filter)
                  .map((row) => row[1]);
          setFindTop3CardTypesByJobType(mainUsesByJob);

          setLoading(false);
        }
      )
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
                >
                  All DATA
                </Text>
                <Text
                  color={textColorSecondary}
                  fontSize="md"
                  me="26px"
                  mb="40px"
                >
                  종합데이터
                </Text>
              </div>
              <div>
                <Select
                  value={filter}
                  onChange={handleFilterChange}
                  borderColor="blue.500"
                >
                  <option value="all">All</option>
                  <option value="직장인">직장인</option>
                  <option value="공무원">공무원</option>
                  <option value="전문직">전문직</option>
                  <option value="프리랜서">프리랜서</option>
                  <option value="개인사업자">개인사업자</option>
                  <option value="법인사업자">법인사업자</option>
                  <option value="대학생">대학생</option>
                  <option value="전업주부">전업주부</option>
                  <option value="무직">무직</option>
                </Select>
              </div>
            </div>
            <Text color={textColorPrimary} fontSize="xl">
              포함된 고객 수 : {countByJobTypeAndAll}명<br></br>
              평균 연령 : {averageAgeByJobTypeAndAll}세<br></br>
              평균 연봉 : {mostsalaryData}
              <br></br>
              평균 소비금액 : {paymentByJobTypeAndAll}
              <br></br>
              가장 많이 사용한 카드 :{" "}
              {topCardsByJobType
                ? topCardsByJobType.join(", ")
                : "데이터를 불러오는 중..."}
              <br></br>주 사용처 :{" "}
              {findTop3CardTypesByJobType
                ? findTop3CardTypesByJobType.join(", ")
                : "데이터를 불러오는 중..."}
            </Text>
          </div>
        )}
      </Card>
    </>
  );
}
