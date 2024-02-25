import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Heading, Stack, StackDivider, Box, Text } from '@chakra-ui/react';
import Card from 'components/card/Card.js';
import styled from 'styled-components';

const CardRight = styled.div`
    margin: 0 10px;
    & .infoTxt {
        font-size: 14px;
        font-weight: bold;
        & + .infoTxt {
            border-top: 1px solid #e2e8f0;
            padding-top: 8px;
            margin-top: 8px;
        }
    }
`;

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
    }, [data]);

    return (
        <>
            {cardData != null && (
                    <CardRight className="cardRight">
                        <Text className="infoTxt">
                            연간 혜택 가치(카드 기준) : {formatNumber(cardData.expectedBenefitValue)} 원
                        </Text>
                        <Text className="infoTxt">
                            총 결제 건수 : {formatNumber(cardData.total_pay_cnt_2023)} 건
                        </Text>
                        <Text className="infoTxt">
                            총 결제 금액 : {formatNumber(cardData.total_pay_sum_2023)} 원
                        </Text>
                        <Text className="infoTxt">
                            관련 혜택명 : {data.benefit_detail}
                        </Text>
                        <Text className="infoTxt">
                            관련 혜택 적용 금액 : {formatNumber(cardData.sum_benefit)} 원
                        </Text>
                        <Text className="infoTxt">
                            관련 혜택 사용 횟수 : {formatNumber(cardData.cnt_benefit)} 회
                        </Text>
                        <Text className="infoTxt">
                            연회비 : {formatNumber(cardData.card_annual_fee)} 원
                        </Text>
                    </CardRight>
            )}
        </>
    );
}

export default ShowDataBenefit;
