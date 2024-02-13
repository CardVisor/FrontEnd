import { Box, Flex } from "@chakra-ui/react";
import Card from "components/card/Card";
import { useEffect } from "react";

function BenefitUsingPieSlice(props) {
  const clickedChartEl = props.data;
  useEffect(() => {}, [clickedChartEl]);
  return (
    <Card p="20px">
      <Flex direction={{ base: "column" }} justify="center">
        <Box mb={{ base: "1px", "2xl": "1px" }} position="relative">
          <h1>{clickedChartEl}</h1>
        </Box>
      </Flex>
    </Card>
  );
}

export default BenefitUsingPieSlice;
