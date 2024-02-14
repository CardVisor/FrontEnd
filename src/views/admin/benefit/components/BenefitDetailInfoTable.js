import { Flex, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

// Custom components
import axios from 'axios';
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';
export default function BenefitDetailInfoTable(props) {
    const textColor = useColorModeValue('secondaryGray.900', 'white');
    const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
    const clickedChartEl = props.data;
    const [selectedMCC, setSelectedMCC] = useState(0);
    useEffect(() => {
        axios({
            method: 'get',
            url: '/benefitCluster/BenefitDetail',
            data: clickedChartEl,
        })
            .then((res) => {})
            .catch((err) => {
                console.log(err);
            });
    }, [clickedChartEl]);
    return (
        <Card direction="column" w="100%" px="0px" overflowX={{ sm: 'scroll', lg: 'hidden' }}>
            <Flex px="25px" justify="space-between" align="center">
                <Text color={textColor} fontSize="22px" fontWeight="700" lineHeight="100%">
                    혜택 상세 정보 {clickedChartEl}
                </Text>
                <Menu />
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
                                NAME
                            </Flex>
                        </Th>
                        <Th pe="10px" borderColor={borderColor}>
                            <Flex
                                justify="space-between"
                                align="center"
                                fontSize={{ sm: '10px', lg: '12px' }}
                                color="gray.400"
                            >
                                PROGRESS
                            </Flex>
                        </Th>

                        <Th pe="10px" borderColor={borderColor}>
                            <Flex
                                justify="space-between"
                                align="center"
                                fontSize={{ sm: '10px', lg: '12px' }}
                                color="gray.400"
                            >
                                QUANTITY
                            </Flex>
                        </Th>
                        <Th pe="10px" borderColor={borderColor}>
                            <Flex
                                justify="space-between"
                                align="center"
                                fontSize={{ sm: '10px', lg: '12px' }}
                                color="gray.400"
                            >
                                ANUALFEE
                            </Flex>
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {/* {clist &&
                        clist.map((card, index) => (
                            <Tr key={`id${index}`}>
                                <Td>
                                    <Text color={textColor} fontSize="sm" fontWeight="700">
                                        1
                                    </Text>
                                </Td>
                                <Td>
                                    <Flex align="center">
                                        <Text me="10px" color={textColor} fontSize="sm" fontWeight="700">
                                            1
                                        </Text>
                                    </Flex>
                                </Td>
                                <Td>
                                    <Flex align="center">
                                        <Text me="10px" color={textColor} fontSize="sm" fontWeight="700">
                                            2
                                        </Text>
                                    </Flex>
                                </Td>
                                <Td>
                                    <Flex align="center">
                                        <Text me="10px" color={textColor} fontSize="sm" fontWeight="700">
                                            3원
                                        </Text>
                                    </Flex>
                                </Td>
                            </Tr>
                        ))} */}
                </Tbody>
            </Table>
        </Card>
    );
}
