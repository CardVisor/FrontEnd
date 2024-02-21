import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Heading, Stack, StackDivider, Box } from '@chakra-ui/react';
import Card from 'components/card/Card.js';

function ShowDataBenefit(props) {
    const { card_annual_fee } = props;

    return (
        <Card>
            <Stack divider={<StackDivider />} spacing="3" mt="20px">
                <Box>
                    <Heading size="xs" textTransform="uppercase">
                        총 이용 고객 : {'아직몰라'}
                    </Heading>
                </Box>
                <Box>
                    <Heading size="xs" textTransform="uppercase">
                        총 이용 고객 : {'아직몰라'}
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

export default ShowDataBenefit;
