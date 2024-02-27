import { Flex, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

// Custom components
import Card from 'components/card/Card';
import Menu from './AdminMainMenu';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { mainState } from 'views/admin/Recoil/MainState';
export default function AdminAbPayCheckTable(props) {
    const API_SERVER = process.env.REACT_APP_API_SERVER;
    const textColor = useColorModeValue('secondaryGray.900', 'white');
    const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
    const [clist, setCList] = useState([]);
    const [totalAmount, setTotalAmount] = useState();
    const [memo, setMemo] = useState();
    const SetMainState = useSetRecoilState(mainState);
    const formatNumber = (number) => {
        if (number > 0) {
            return new Intl.NumberFormat('ko-KR').format(number);
        } else if (number === 0) {
            return number;
        }
    };
    useEffect(() => {
        SetMainState(true);
        axios({
            method: 'get',
            url: API_SERVER + '/main/benefitTop5Card',
        })
            .then((res) => {
                setCList(res.data);
                let Message =
                    '청구할인을 많이 받은 혜택중에 혜택을 가장많이 사용한 카드와 그 카드가 할인받은 총 금액입니다.';
                setMemo(Message);
                SetMainState(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    useEffect(() => {
        axios({
            method: 'get',
            url: API_SERVER + '/main/benefitTotalAmount',
        })
            .then((res) => {
                setTotalAmount(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <Card direction="column" w="100%" px="0px" overflowX={{ sm: 'scroll', lg: 'hidden' }}>
            <Flex px="25px" justify="space-between" align="center">
                <Text color={textColor} fontSize="22px" fontWeight="700" lineHeight="100%">
                    청구할인금액 기준 혜택 상위 TOP5
                </Text>
                <Menu memo={memo} />
            </Flex>
            <Table variant="simple" color="gray.500" mb="24px">
                <Thead>
                    <Tr>
                        <Th pe="10px" borderColor={borderColor}>
                            {' '}
                            <Flex
                                justify="space-between"
                                align="center"
                                fontSize={{ sm: '10px', lg: '12px' }}
                                color="gray.400"
                            >
                                혜택이름
                            </Flex>
                        </Th>
                        <Th pe="10px" borderColor={borderColor}>
                            {' '}
                            <Flex
                                justify="space-between"
                                align="center"
                                fontSize={{ sm: '10px', lg: '12px' }}
                                color="gray.400"
                            >
                                카드명
                            </Flex>
                        </Th>

                        <Th pe="10px" borderColor={borderColor}>
                            {' '}
                            <Flex
                                justify="space-between"
                                align="center"
                                fontSize={{ sm: '10px', lg: '12px' }}
                                color="gray.400"
                            >
                                할인받은금액
                            </Flex>
                        </Th>
                        <Th pe="10px" borderColor={borderColor}>
                            {' '}
                            <Flex
                                justify="space-between"
                                align="center"
                                fontSize={{ sm: '10px', lg: '12px' }}
                                color="gray.400"
                            >
                                금액대비비율
                            </Flex>
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {clist &&
                        clist.map((card, index) => (
                            <Tr key={`id${index}`}>
                                <Td>
                                    <Text color={index === 0 ? '#5E3AFF' : textColor} fontSize="sm" fontWeight="700">
                                        {card.benefit_detail}
                                    </Text>
                                </Td>
                                <Td>
                                    <Flex align="center">
                                        <Text
                                            me="10px"
                                            color={index === 0 ? '#5E3AFF' : textColor}
                                            fontSize="sm"
                                            fontWeight="700"
                                        >
                                            {card.card_name}
                                        </Text>
                                    </Flex>
                                </Td>
                                <Td>
                                    <Flex align="center">
                                        <Text
                                            me="10px"
                                            color={index === 0 ? '#5E3AFF' : textColor}
                                            fontSize="sm"
                                            fontWeight="700"
                                        >
                                            {formatNumber(card.total)}원
                                        </Text>
                                    </Flex>
                                </Td>
                                <Td align="center">
                                    <Flex align="center">
                                        <Text
                                            me="10px"
                                            color={index === 0 ? '#5E3AFF' : textColor}
                                            fontSize="sm"
                                            fontWeight="700"
                                        >
                                            {((card.total / totalAmount) * 100).toFixed(1)}%
                                        </Text>
                                    </Flex>
                                </Td>
                            </Tr>
                        ))}
                </Tbody>
            </Table>
        </Card>
    );
}
