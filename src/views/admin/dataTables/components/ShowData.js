import React from 'react';
//import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { Heading, Stack, StackDivider, Box, Text } from '@chakra-ui/react'
import Card from "components/card/Card.js";

function ShowData(props) {
    return (
        <Card>
 
    <Stack divider={<StackDivider />} spacing='4'>
      <Box>
        <Heading size='xs' textTransform='uppercase'>
          Summary
        </Heading>
        <Text pt='2' fontSize='sm'>
          View a summary of all your clients over the last month.
        </Text>
      </Box>
      <Box>
        <Heading size='xs' textTransform='uppercase'>
          Overview
        </Heading>
        <Text pt='2' fo ntSize='sm'>
          Check out the overview of your clients.
        </Text>
      </Box>
      <Box>
        <Heading size='xs' textTransform='uppercase'>
          Analysis
        </Heading>
        <Text pt='2' fontSize='sm'>
          See a detailed analysis of all your business clients.
        </Text>
      </Box>
      
    </Stack>
 
</Card>
    );
}

export default ShowData;