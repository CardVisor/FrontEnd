// Chakra imports
// Chakra imports
import {
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
  Text,
  StatHelpText,
  StatArrow,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
// Custom icons
import React from "react";

export default function Default(props) {
  const { startContent, name, value, comparePercentage } = props;
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "secondaryGray.600";

  return (
    <Card py="15px">
      <Flex
        my="auto"
        h="100%"
        align="center"
        justify="center"
      >
        {startContent}

        <Stat my="auto" ms={startContent ? "18px" : "0px"}>
          <StatLabel
            lineHeight="100%"
            color={textColorSecondary}
            fontSize={{
              base: "sm",
            }}
          >
            {name}
          </StatLabel>
          <StatNumber
            color={textColor}
            fontSize={{
              base: "2xl",
            }}
          >
            {value}
          </StatNumber>
          {comparePercentage ? (
            <StatHelpText>
            <StatArrow type={comparePercentage>=0?'increase':'decrease'} />
            {comparePercentage}%
          </StatHelpText>
          ):null}
        </Stat>
        {/* <Flex ms="auto" w="max-content">
          {endContent}
        </Flex> */}
      </Flex>
    </Card>
  );
}
