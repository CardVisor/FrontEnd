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
                    <Box mb={{ base: '1px', '2xl': '1px' }} position="relative">
                        <Heading size="md" mb="16px">{cardData.card_name}</Heading>
                        <SimpleGrid columns={2} spacingX="0px">
                            <Box m="0 10px" position={'relative'}>
                                <Image
                                    position={'absolute'}
                                    left="50%"
                                    top="50%"
                                    transform="translate(-50%, -50%)"
                                    src={cardData.card_img_url}
                                    w="100%"
                                />
                            </Box>
                            <ShowDataBenefit data={data} cardData={cardData}></ShowDataBenefit>
                        </SimpleGrid>
                    </Box>
                </Card>
            ))}
        </>
    );
}
