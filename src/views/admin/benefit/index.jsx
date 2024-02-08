import { Box, Grid, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import BenefitTreemap from './components/BenefitTreemap';
import * as am5 from '@amcharts/amcharts5';
  
export default function Settings() {
    let data = {
        "Acura": {
          "ILX": 11757,
          "MDX": 54886,
        },
        "Alfa Romeo": {
          "4C": 407,
          "Giulia": 8903,
          
        }
    };

    
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
                <BenefitTreemap data={data}></BenefitTreemap>
            </Grid>
        </Box>
    );
}
