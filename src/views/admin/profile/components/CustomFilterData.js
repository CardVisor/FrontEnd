import { Box, Divider, Grid, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card";
import React from "react";



export default function Overview({data}) {
    const textColor = useColorModeValue("secondaryGray.900", "white");
    // 각 섹션에 대한 참조 생성
    
  
  return (
    <>
      <Text color={textColor} fontSize="2xl" ms="24px" fontWeight="700" mt="20px">
        필터 조회
      </Text>
      <Card mb={{ base: "0px", "2xl": "20px" }}>
        <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6} templateRows="repeat(2, 1fr)">
          <Box bg="#F4F7FE" height="200px" borderRadius="md" padding="4" color="black">
            <VStack spacing={3} alignItems="center">
              <Text fontSize="xl" fontWeight="bold" borderColor="black" pb="2" mb="2">
              {/* 데이터를 화면에 표시 */}
              {data && (
              <>
                포함된 고객 수 : {data.count}
                평균 연령 : {data.averageAge}
                평균 연봉 : {data.distinctSalaries}
                평균 사용금액 : {data.averagePayment}
                가장 많이 사용한 카드 : {data.cardName}
                주 사용처 : {data.cardMcc}
              </>
            )}
              </Text>
              <Text fontSize="3xl" fontWeight="bold" color="black">
                
              </Text>
            </VStack>
          </Box>
          <Box bg="#F4F7FE" height="200px" borderRadius="md" padding="4" color="black" gridColumn={{ base: 1, md: 2, lg: 1 }} gridRow={{ base: 2, md: 1, lg: 2 }}>
            Box 4
          </Box>
        </Grid>
      </Card>
    </>
  );
}