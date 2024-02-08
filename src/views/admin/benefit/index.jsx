import { Box, Grid, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import BenefitTreemap from '../default/components/BenefitTreemap';

export default function Settings() {
    // Chakra Color Mode
    return (
        <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
            <Grid
                mb="30px"
                mr="60px"
                ml="60px"
                templateColumns={{
                    base: '1fr',
                    lg: '1.2fr 3.5fr',
                }}
                templateRows={{
                    base: 'repeat(1, 1fr)',
                    lg: '1fr',
                }}
                gap={{ base: '20px', xl: '20px' }}
            >
                <BenefitTreemap></BenefitTreemap>
            </Grid>
        </Box>
    );
}
