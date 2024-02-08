// Chakra imports
// Chakra imports

// Custom components

// Custom icons
import {
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import Card from "components/card/Card.js";
import React from "react";

export default function Default(props) {
  const {
    startContent,
    endContent,
    name,
    growth,
    value,
    growthnum,
    totalperson,
    abroadvalue,
    abroadgrowth,
  } = props;
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "secondaryGray.600";
  const options2 = {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  };
  const numberFormat2 = new Intl.NumberFormat("en-US", options2);
  const formatabroad = (number) => {
    if (number < 0) {
      number = Math.abs(number);
      if (number >= 100000000) {
        return `-${numberFormat2.format(
          (number / 100000000).toFixed(2)
        )} billion`;
      } else if (number >= 1000000) {
        return `-${numberFormat2.format(
          (number / 1000000).toFixed(2)
        )} million`;
      } else if (number >= 10000) {
        return `-${numberFormat2.format((number / 1000).toFixed(2))} thousand`;
      } else {
        return `-${numberFormat2.format(number.toString())}`;
      }
    } else {
      if (number >= 100000000) {
        return `${numberFormat2.format(
          (number / 100000000).toFixed(2)
        )} billion`;
      } else if (number >= 1000000) {
        return `${numberFormat2.format((number / 1000000).toFixed(2))} million`;
      } else if (number >= 10000) {
        return `${numberFormat2.format((number / 1000).toFixed(2))} thousand`;
      } else {
        return numberFormat2.format(number.toString());
      }
    }
  };
  const formatNumber = (number) => {
    if (number < 0) {
      number = Math.abs(number);
      if (number >= 100000000) {
        return `-${(number / 100000000).toFixed(2)} 억`;
      } else if (number >= 1000000) {
        return `-${(number / 1000000).toFixed(2)} 백만`;
      } else if (number >= 10000) {
        return `-${(number / 10000).toFixed(2)} 만`;
      } else {
        return `-${number.toString()}`;
      }
    } else {
      if (number >= 100000000) {
        return `${(number / 100000000).toFixed(2)} 억`;
      } else if (number >= 1000000) {
        return `${(number / 1000000).toFixed(2)} 백만`;
      } else if (number >= 10000) {
        return `${(number / 10000).toFixed(2)} 만`;
      } else {
        return number;
      }
    }
  };

  return (
    <Card py="15px">
      <Flex
        my="auto"
        h="100%"
        align={{ base: "center", xl: "start" }}
        justify={{ base: "center", xl: "center" }}
      >
        {startContent}
        <Stat Cardmy="auto" ms={startContent ? "18px" : "0px"}>
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
            {totalperson}
          </StatNumber>
          <StatNumber
            color={textColor}
            fontSize={{
              base: "2xl",
            }}
          >
            {abroadvalue ? formatabroad(abroadvalue) : null}
          </StatNumber>

          <StatNumber
            color={textColor}
            fontSize={{
              base: "2xl",
            }}
          >
            {formatNumber(value)}
          </StatNumber>

          {growthnum ? (
            <Flex align="center">
              <Text
                color={growthnum > 0 ? "green.500" : "red.500"}
                fontSize="xs"
                fontWeight="700"
                me="5px"
              >
                {growthnum ? formatNumber(growthnum) : null}
              </Text>
              <Text color="secondaryGray.600" fontSize="xs" fontWeight="400">
                since last month
              </Text>
            </Flex>
          ) : null}
          {growth ? (
            <Flex align="center">
              <Text
                color={growth > 0 ? "green.500" : "red.500"}
                fontSize="xs"
                fontWeight="700"
                me="5px"
              >
                {growth ? formatNumber(growth) : null}
              </Text>
            </Flex>
          ) : null}
          {abroadgrowth ? (
            <Flex align="center">
              <Text
                color={growth > 0 ? "green.500" : "red.500"}
                fontSize="xs"
                fontWeight="700"
                me="5px"
              >
                {abroadgrowth ? formatabroad(abroadgrowth) : null}
              </Text>
            </Flex>
          ) : null}
        </Stat>
        <Flex ms="auto" w="max-content">
          {endContent}
        </Flex>
      </Flex>
    </Card>
  );
}
