import { Box, Button, Checkbox, CheckboxGroup, Collapse, Flex, Select, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Overview from "./CustomFilterData";
import axios from "axios";

export default function CustomFilter() {
  const { isOpen, onToggle } = useDisclosure();
  const [jobType, setJobType] = useState('all');
  const [salaryRange, setSalaryRange] = useState('all');
  const [gender, setGender] = useState([]);
  const [ageRange, setAgeRange] = useState([]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  


    // 필터를 변경하는 함수입니다.
  const handleFilterChange1 = (event) => {
    setJobType(event.target.value);
  };
  const handleFilterChange2 = (event) => {
    setSalaryRange(event.target.value);
  };

  // 체크박스의 변경사항을 처리하는 함수입니다.
  const handleCheckboxChange = (setFunction) => (values) => {
    console.log("setFunction..." + values)
    setFunction([values]);
  };

  const handleSelection = () => {
    setLoading(true);
    setError(null);

    // const filters = { gender, age, filter1, filter2 };
    // 배열의 첫 번째 원소를 추출하여 필터 객체를 생성합니다.
    const filters = {
      gender: gender,
      age: ageRange,
      jobType,
      salaryRange
    };
    
    axios.post('/customer/stats',filters)
    .then(function (response) {
      setData(response.data);
      console.log(response);
    })
    .catch(function (error) {
      setError(error);
      console.log(error);
    })
    .finally(function () {
      setLoading(false);
    });
  
    console.log("Filters:", filters);
  };

  useEffect(() => {
    if (error) {
      // 에러가 발생했을 때 5초 후에 에러 상태를 초기화
      setTimeout(() => {
        setError(null);
      }, 1500);
    }
  }, [error]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error occurred: {error.message}</div>;


    return (
      <>
      
        <Button onClick={onToggle}>Customer CustomFilter</Button>
        <Collapse in={isOpen}  transition={{ property: "opacity", duration: { enter: 500, exit: 1000 } }}>
          <Box
            p='40px'
            color='white'
            mt='4'
            bg='rgba(87, 195, 255, 0.1)'
            rounded='md'
            shadow='md'
          >
            <Flex alignItems="center">
              <CheckboxGroup spacing={2} display="flex" onChange={handleCheckboxChange(setGender)}>
                <Checkbox value="남" style={{ color: 'black', marginRight: '10px', borderColor: '#5E3AFF', fontWeight: '800' }}>남성</Checkbox>
                <Checkbox value="여" style={{ color: 'black', marginRight: '50px', borderColor: '#5E3AFF', fontWeight: '800' }}>여성</Checkbox>
              </CheckboxGroup>
              <CheckboxGroup spacing={2} display="flex" onChange={handleCheckboxChange(setAgeRange)}>
                <Checkbox value="20대" style={{ color: 'black', marginRight: '10px', borderColor: '#5E3AFF', fontWeight: '800' }}>20대</Checkbox>
                <Checkbox value="30대" style={{ color: 'black', marginRight: '10px', borderColor: '#5E3AFF', fontWeight: '800' }}>30대</Checkbox>
                <Checkbox value="40대" style={{ color: 'black', marginRight: '10px', borderColor: '#5E3AFF', fontWeight: '800' }}>40대</Checkbox>
                <Checkbox value="50대" style={{ color: 'black', marginRight: '10px', borderColor: '#5E3AFF', fontWeight: '800' }}>50대</Checkbox>
                <Checkbox value="60대" style={{ color: 'black', marginRight: '10px', borderColor: '#5E3AFF', fontWeight: '800' }}>60대</Checkbox>
                <Checkbox value="70대 이상" style={{ color: 'black', marginRight: '50px', borderColor: '#5E3AFF', fontWeight: '800' }}>70대 이상</Checkbox>
              </CheckboxGroup>

              <Select value={jobType} onChange={handleFilterChange1} borderRadius= "5px" borderWidth="2px" borderColor="blue.500" width="150px" color="blue" marginRight="30px" size="sm" fontWeight= "800">
                <option value="null">직업 선택</option>
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
              <Select value={salaryRange} onChange={handleFilterChange2} borderRadius= "5px" borderWidth="2px" borderColor="blue.500" textAlign="center" width="251px" color="blue" size="sm" fontWeight= "800" marginRight= "50px">
                  <option value="null">연봉 선택</option>
                  <option value="3000만원 미만">3000만원 미만</option>
                  <option value="3000만원 이상 5000만원 미만">3000만원 이상 5000만원 미만</option>
                  <option value="5000만원 이상 7000만원 미만">5000만원 이상 7000만원 미만</option>
                  <option value="7000만원 이상 1억 미만">7000만원 이상 1억 미만</option>
                  <option value="1억 이상">1억 이상</option>
              </Select>
              <Button onClick={handleSelection} colorScheme="blue">선택</Button>
            </Flex>
            
            <Collapse in={isOpen}  transition={{ property: "opacity", duration: { enter: 500, exit: 1000 } }}>
            <Box
            p='40px'
            color='white'
            mt='4'
            bg='rgba(87, 195, 255, 0.1)'
            rounded='md'
            shadow='md'
          >
            
            <Overview data={data} />

            </Box>

            </Collapse>
            
            {/* Lorem 컴포넌트가 외부 라이브러리에서 가져온 것이라면 해당 라이브러리를 import */}
            {/* 아니라면 데이터를 표시하는 로직을 추가 */}
          </Box>
        </Collapse>
      </>
    )
  }