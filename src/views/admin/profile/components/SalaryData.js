import { Text, useColorModeValue, Select } from "@chakra-ui/react";
import Card from "components/card/Card.js";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function SalaryData(props) {
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
          <option value="option1">3000만원 미만</option>
          <option value="option2">3000만원 이상 5000만원 미만</option>
          <option value="option3">5000만원 이상 7000만원 미만</option>
          <option value="option4">7000만원 이상 1억 미만</option>
          <option value="option5">1억 이상</option>
        </Select>
      </div>
      </div>
      {/* 데이터를 보여주는 코드... */}
    </Card>
  );
}