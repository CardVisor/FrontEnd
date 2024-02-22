// Chakra imports
import { Box, Flex, Heading, Image, SimpleGrid, useColorModeValue } from '@chakra-ui/react';
import Card from 'components/card/Card.js';
import ShowDataBenefit from './ShowData_hs';

export default function NFTBenefit({ data, benefit_pct, benefit_detail }) {
    const textColor = useColorModeValue('navy.700', 'white');
    const textColorBid = useColorModeValue('brand.500', 'white');
    return (
        <>
            {data.card_benefit_info.map((cardData, index) => (
                <Card key={index} p="20px">
                    <Flex direction={{ base: 'column' }} justify="center">
                        <Box mb={{ base: '1px', '2xl': '1px' }} position="relative">
                            <Heading size="md">{cardData.card_name}</Heading>
                            <SimpleGrid columns={2} spacingX="0px">
                                <ShowDataBenefit data={data} cardData={cardData}></ShowDataBenefit>
                                <Box position={'relative'}>
                                    <Image
                                        position={'absolute'}
                                        left="50%"
                                        transform="translate(-50%, -50%)"
                                        top="50%"
                                        src={cardData.card_img_url}
                                        w={{ base: '200px' }}
                                        h={{ base: '120px' }}
                                        borderRadius="20px"
                                    />
                                </Box>
                            </SimpleGrid>
                        </Box>
                    </Flex>
                </Card>
            ))}
        </>
    );
}
