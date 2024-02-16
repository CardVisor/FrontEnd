import { Flex, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

// Custom components
import axios from 'axios';
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';
import { string } from '@amcharts/amcharts4/core';
export default function BenefitDetailInfoTable(props) {
    const textColor = useColorModeValue('secondaryGray.900', 'white');
    const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
    const { clickedChartEl, clickFlag } = props;
    const [benefitList, setBenefitList] = useState();
    const formatNumber = (number) => {
        if (number > 0) {
            return new Intl.NumberFormat('ko-KR').format(number);
        } else if (number === 0) {
            return '-';
        }
    };
    useEffect(() => {
        var senddata = { cateName: clickedChartEl };
        if (clickFlag) {
            axios({
                method: 'post',
                url: '/benefitCluster/BenefitDetail',
                data: senddata,
            })
                .then((res) => {
                    console.log(res.data);
                    setBenefitList(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [clickedChartEl, clickFlag]);
    return (
        <Card direction="column" w="100%" px="0px" overflowX={{ sm: 'scroll', lg: 'hidden' }}>
            <Flex px="25px" justify="space-between" align="center">
                <Text color={textColor} fontSize="22px" fontWeight="700" lineHeight="100%">
                    혜택 상세 정보 : {clickedChartEl}
                </Text>
            </Flex>
            <Table variant="simple" color="gray.500" mb="24px">
                <Thead>
                    <Tr>
                        <Th pe="10px" borderColor={borderColor}>
                            <Flex
                                justify="space-between"
                                align="center"
                                fontSize={{ sm: '10px', lg: '12px' }}
                                color="gray.400"
                            >
                                혜택명
                            </Flex>
                        </Th>
                        <Th pe="10px" borderColor={borderColor}>
                            <Flex
                                justify="space-between"
                                align="center"
                                fontSize={{ sm: '10px', lg: '12px' }}
                                color="gray.400"
                            >
                                혜택 누적 금액(원)
                            </Flex>
                        </Th>
                        <Th pe="10px" borderColor={borderColor}>
                            <Flex
                                justify="space-between"
                                align="center"
                                fontSize={{ sm: '10px', lg: '12px' }}
                                color="gray.400"
                            >
                                사용 횟수
                            </Flex>
                        </Th>

                        <Th pe="10px" borderColor={borderColor}>
                            <Flex
                                justify="space-between"
                                align="center"
                                fontSize={{ sm: '10px', lg: '12px' }}
                                color="gray.400"
                            >
                                인당 수혜 금액(원)
                            </Flex>
                        </Th>
                        <Th pe="10px" borderColor={borderColor}>
                            <Flex
                                justify="space-between"
                                align="center"
                                fontSize={{ sm: '10px', lg: '12px' }}
                                color="gray.400"
                            >
                                연관 카드 수
                            </Flex>
                        </Th>

                        <Th pe="10px" borderColor={borderColor}>
                            <Flex
                                justify="space-between"
                                align="center"
                                fontSize={{ sm: '10px', lg: '12px' }}
                                color="gray.400"
                            >
                                혜택 최고 적립 카드(원)
                            </Flex>
                        </Th>
                        <Th pe="10px" borderColor={borderColor}>
                            <Flex
                                justify="space-between"
                                align="center"
                                fontSize={{ sm: '10px', lg: '12px' }}
                                color="gray.400"
                            >
                                혜택 최다 사용 카드(건)
                            </Flex>
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {benefitList &&
                        benefitList.map((b, index) => (
                            <Tr key={`id${index}`} pe="10px" borderColor={borderColor}>
                                <Td
                                    borderRight={'1px'}
                                    borderRightColor={borderColor}
                                    borderColor={borderColor}
                                    borderBottom={'1px'}
                                    borderBottomStyle={'dashed'}
                                >
                                    <Text color={textColor} fontSize={{ sm: '13px' }} fontWeight="700">
                                        {b.benefit_detail}
                                    </Text>
                                </Td>
                                <Td borderColor={borderColor} borderBottom={'1px'} borderBottomStyle={'dashed'}>
                                    <Flex align="center">
                                        <Text me="10px" color={textColor} fontSize="sm" fontWeight="700">
                                            {formatNumber(b.total_sum)}
                                        </Text>
                                    </Flex>
                                </Td>
                                <Td borderColor={borderColor} borderBottom={'1px'} borderBottomStyle={'dashed'}>
                                    <Flex align="center">
                                        <Text me="10px" color={textColor} fontSize="sm" fontWeight="700">
                                            {formatNumber(b.total_count)}
                                        </Text>
                                    </Flex>
                                </Td>

                                <Td borderColor={borderColor} borderBottom={'1px'} borderBottomStyle={'dashed'}>
                                    <Flex align="center">
                                        <Text me="10px" color={textColor} fontSize="sm" fontWeight="700">
                                            {formatNumber(b.amount_per_person)}
                                        </Text>
                                    </Flex>
                                </Td>
                                <Td borderColor={borderColor} borderBottom={'1px'} borderBottomStyle={'dashed'}>
                                    <Flex align="center">
                                        <Text me="10px" color={textColor} fontSize="sm" fontWeight="700">
                                            {formatNumber(b.related_card_cnt)}
                                        </Text>
                                    </Flex>
                                </Td>
                                <Td borderColor={borderColor} borderBottom={'1px'} borderBottomStyle={'dashed'}>
                                    <Flex align="center">
                                        <Text me="10px" color={textColor} fontSize={{ sm: '10px' }} fontWeight="700">
                                            {b.max_sum === undefined
                                                ? '-'
                                                : b.max_sum_card_name + ' (' + formatNumber(b.max_sum) + ')'}
                                        </Text>
                                    </Flex>
                                </Td>
                                <Td borderColor={borderColor} borderBottom={'1px'} borderBottomStyle={'dashed'}>
                                    <Flex align="center">
                                        <Text me="10px" color={textColor} fontSize={{ sm: '10px' }} fontWeight="700">
                                            {b.max_cnt === undefined
                                                ? '-'
                                                : b.max_cnt_card_name + ' (' + formatNumber(b.max_cnt) + ')'}
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
