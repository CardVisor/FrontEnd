import { Text, useColorModeValue, Select } from "@chakra-ui/react";
import Card from "components/card/Card.js";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function JobData(props) {
  const [filter, setFilter] = useState('all');
  const [data, setData] = useState([]);

  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );

  useEffect(() => {
    // 필터에 따라 다른 엔드포인트에서 데이터를 가져옵니다.
    const endpoint = filter === 'all' ? '/data/all' : `/data/${filter}`;
    axios.get(endpoint)
      .then(response => {
        const data = response.data;
        setData(data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, [filter]);

  // 필터를 변경하는 함수입니다.
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // 나머지 코드...

  return (
    <Card mb={{ base: "0px", "2xl": "20px" }}>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <div>
          <Text
            color={textColorPrimary}
            fontWeight='bold'
            fontSize='2xl'
            mt='10px'
            mb='4px'>
            All DATA
          </Text>
          <Text color={textColorSecondary} fontSize='md' me='26px' mb='40px'>
            종합데이터
          </Text>
        </div>
        <div>
        <Select value={filter} onChange={handleFilterChange} borderColor="blue.500">
          <option value="all">All</option>
          <option value="option1">직장인</option>
          <option value="option2">공무원</option>
          <option value="option3">전문직</option>
          <option value="option4">프리랜서</option>
          <option value="option5">개인사업자</option>
          <option value="option6">법인사업자</option>
          <option value="option7">대학생</option>
          <option value="option8">전업주부</option>
          <option value="option9">무직</option>
        </Select>
      </div>
      </div>
      <Text color={textColorPrimary} fontSize='xl'>
              포함된 고객 수 : <br></br>
              평균 연령 : <br></br>
              평균 연봉 : <br></br>
              일 평균 사용금액 : <br></br>
              가장 많이 사용한 카드 :<br></br>
              주 사용처 : 
            </Text>
    </Card>
  );
}