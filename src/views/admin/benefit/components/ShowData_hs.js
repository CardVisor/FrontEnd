import React, { useEffect, useState } from "react";
import axios from "axios";
import { Heading, Stack, StackDivider, Box } from "@chakra-ui/react";
import Card from "components/card/Card.js";

const formatNumber = (number) => {
  if (number > 0) {
    return new Intl.NumberFormat("ko-KR").format(number);
  } else if (number === 0) {
    return "-";
  }
};

function ShowDataBenefit({ card }) {
  return (
    <Card>
      <Stack divider={<StackDivider />} spacing="3" mt="20px">
        <Box>
          <Heading size="xs" textTransform="uppercase">
            총 결제 건수 : {formatNumber(card.max_cnt_fee)} 건
          </Heading>
        </Box>
        <Box>
          <Heading size="xs" textTransform="uppercase">
            총 결제 금액 : {formatNumber(card.max_cnt_fee)} 원
          </Heading>
        </Box>
        <Box>
          <Heading size="xs" textTransform="uppercase">
            관련 혜택명 : {card.benefit_detail}
          </Heading>
        </Box>
        <Box>
          <Heading size="xs" textTransform="uppercase">
            관련 혜택 적용 금액 : {formatNumber(card.max_sum)} 원
          </Heading>
        </Box>
        <Box>
          <Heading size="xs" textTransform="uppercase">
            관련 혜택 사용 횟수 : {formatNumber(card.max_cnt)} 회
          </Heading>
        </Box>
        <Box>
          <Heading size="xs" textTransform="uppercase">
            연회비 : {formatNumber(card.max_cnt_fee)} 원
          </Heading>
        </Box>
      </Stack>
    </Card>
  );
}

export default ShowDataBenefit;
