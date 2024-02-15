import React from "react";
import { Box, Select, Input, Flex, Grid } from "@chakra-ui/react";
import Card from "components/card/Card";

const TopBar = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const monthOptions = [];
  for (let year = currentYear; year >= currentYear - 2; year--) {
    const startMonth = year === currentYear ? currentMonth : 12;
    const endMonth = year === currentYear - 2 ? currentMonth + 1 : 1;

    for (let month = startMonth; month >= endMonth; month--) {
      const monthString = month < 10 ? `0${month}` : `${month}`;
      const yearString = String(year).substring(2);
      const optionText = `${yearString}년 ${monthString}월`;
      const optionValue = `${yearString}-${monthString}`;
      monthOptions.push({ text: optionText, value: optionValue });
    }
  }

  return (
    <Grid
      mb="30px"
      mr="60px"
      ml="60px"
      templateColumns={{
        base: "1fr",
        lg: "1fr 1fr",
      }}
      templateRows={{
        base: "repeat(1, 5fr)",
        lg: "5fr",
      }}
      gap={{ base: "50px", xl: "500px" }}
    >
      <Card>
        <Box bg="white.200" p={4}>
          <Flex>
            <Select defaultValue={monthOptions[0]?.value} mr={2}>
              {monthOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              ))}
            </Select>

            <Select defaultValue="high" mr={2}>
              <option value="high">이용률 높은순</option>
              <option value="low">이용률 낮은순</option>
            </Select>
          </Flex>
        </Box>
      </Card>
      <Card>
        <Box bg="white.200" p={4}>
          <Flex>
            <Input placeholder="카드명 검색" />
          </Flex>
        </Box>
      </Card>
    </Grid>
  );
};

export default TopBar;
