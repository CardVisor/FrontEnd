import React from "react";
//import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { Heading, Stack, StackDivider, Box, Text } from "@chakra-ui/react";
import Card from "components/card/Card.js";

function ShowData(props) {
  const { card_annual_fee } = props;
  return (
    <Card>
      <Stack divider={<StackDivider />} spacing="3" mt="20px">
        <Box>
          <Heading size="xs" textTransform="uppercase">
            총 이용 고객
          </Heading>
        </Box>
        <Box>
          <Heading size="xs" textTransform="uppercase">
            총 이용 고객
          </Heading>
        </Box>
        <Box>
          <Heading size="xs" textTransform="uppercase">
            총 결제 금액
          </Heading>
        </Box>
        <Box>
          <Heading size="xs" textTransform="uppercase">
            주 사용 연령층
          </Heading>
        </Box>
        <Box>
          <Heading size="xs" textTransform="uppercase">
            고객 성별 비율
          </Heading>
        </Box>
        <Box>
          <Heading size="xs" textTransform="uppercase">
            연회비 : {card_annual_fee} 원
          </Heading>
        </Box>
      </Stack>
    </Card>
  );
}

export default ShowData;
