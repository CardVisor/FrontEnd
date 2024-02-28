import { Box, Flex, Heading, Stack, StackDivider, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card";
import React from "react";
import AmChart from "./CustomFilterChart";



export default function Overview({ data }) {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  // 각 섹션에 대한 참조 생성

  const cardNames = data && data.cardName && Array.isArray(data.cardName) ? data.cardName.slice(0, 3).map(item => item[0]) : [];
  const cardNamesString = cardNames.join(", ");
  const cardMcc = data && data.cardMcc && Array.isArray(data.cardMcc) ? data.cardMcc.slice(0, 3).map(item => item[0]) : [];
  const cardMccString = cardMcc.join(", ");


  // 평균 사용금액을 원화 형식으로 변환하는 함수
  function formatCurrency(amount) {
    // 한국 로케일을 사용하여 통화 형식 지정
    const formatter = new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    });

    // 원화 형식으로 변환된 문자열 반환
    return formatter.format(amount);
  }

  return (
    <>
    
      {data &&  <Card mb={{ base: "0px", "2xl": "30px" }} >
        
        <AmChart data={data}/>
        </Card>}
     
      <Flex display="flex" flex-direction="row" >
          {data && (
          <Card mb={{ base: "0px", "2xl": "30px" }} >
          <Box bg="#FFFFFF" height="330px" borderRadius="15px" padding="4" color="black" width="100%">
              <Stack divider={<StackDivider  />} spacing="3" mt="20px">
            <Box>
              <Heading size="s" textTransform="uppercase" style={{paddingLeft : "10px"}}>
              포함된 고객 수 : {data.count}명
              </Heading>
            </Box>
            <Box>
              <Heading size="s" textTransform="uppercase" style={{paddingLeft : "10px"}}>
              평균 연령 : {data.averageAge}세
              </Heading>
            </Box>
            <Box>
              <Heading size="s" textTransform="uppercase" style={{paddingLeft : "10px"}}>
              평균 연봉 : {data.distinctSalaries && Array.isArray(data.distinctSalaries) ? data.distinctSalaries.join(", ") : ''}
              </Heading>
            </Box>
            <Box>
              <Heading size="s" textTransform="uppercase" style={{paddingLeft : "10px"}}> 
              평균 사용금액: {formatCurrency(data.averagePayment)}
              </Heading>
            </Box>
            <Box>
              <Heading size="s" textTransform="uppercase" style={{paddingLeft : "10px"}}>
              가장 많이 사용한 카드 : {cardNamesString}
              </Heading>
            </Box>
            <Box>
              <Heading size="s" textTransform="uppercase" style={{paddingLeft : "10px"}}>
              주 사용처 : {cardMccString}
              </Heading>
            </Box>
            </Stack>
            </Box>
            </Card>
          )}  
          
        </Flex> 
         
      
    </>
  );
}