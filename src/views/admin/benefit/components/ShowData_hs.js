import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Heading, Stack, StackDivider, Box } from '@chakra-ui/react';
import Card from 'components/card/Card.js';

const formatNumber = (number) => {
    if (number > 0) {
        return new Intl.NumberFormat('ko-KR').format(number);
    } else if (number === 0) {
        return '-';
    }
};

function ShowDataBenefit({ data, cardData }) {
    useEffect(() => {
        console.log(cardData);
    }, [cardData, data]);

    return (
        <>
            {cardData != null && (
                <Card>
                    <Stack divider={<StackDivider />} spacing="3" mt="20px">
                        <Box>
                            <Heading size="xs" textTransform="uppercase">
                                연간 혜택 가치(카드 기준) : {formatNumber(cardData.expectedBenefitValue)} 원
                            </Heading>
                        </Box>
                        <Box>
                            <Heading size="xs" textTransform="uppercase">
                                총 결제 건수 : {formatNumber(cardData.total_pay_cnt_2023)} 건
                            </Heading>
                        </Box>
                        <Box>
                            <Heading size="xs" textTransform="uppercase">
                                총 결제 금액 : {formatNumber(cardData.total_pay_sum_2023)} 원
                            </Heading>
                        </Box>
                        <Box>
                            <Heading size="xs" textTransform="uppercase">
                                관련 혜택명 : {data.benefit_detail}
                            </Heading>
                        </Box>
                        <Box>
                            <Heading size="xs" textTransform="uppercase">
                                관련 혜택 적용 금액 : {formatNumber(cardData.sum_benefit)} 원
                            </Heading>
                        </Box>
                        <Box>
                            <Heading size="xs" textTransform="uppercase">
                                관련 혜택 사용 횟수 : {formatNumber(cardData.cnt_benefit)} 회
                            </Heading>
                        </Box>
                        <Box>
                            <Heading size="xs" textTransform="uppercase">
                                연회비 : {formatNumber(cardData.card_annual_fee)} 원
                            </Heading>
                        </Box>
                    </Stack>
                </Card>
            )}
        </>
    );
}

export default ShowDataBenefit;
