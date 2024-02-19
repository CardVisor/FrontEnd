// Chakra imports
import {
  Box,
  Flex,
  Image,
  SimpleGrid,
  Heading,
  useTheme,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
// Assets
import React, { useState } from "react";
import ShowData from "views/admin/dataTables/components/ShowData";

export default function NFT(props) {
  // const theme = useTheme();
  const {
    image,
    val,
    card_annual_fee,
    cardType,
    month,
    isClicked,
    onClick,
  } = props;

  return (
    <Card
      p="20px"
      onClick={onClick}
      borderColor={isClicked ? "blue" : "transparent"}
      borderWidth="3px"
      style={{ cursor: "pointer" }}
      // style={{
      //   cursor: "pointer",
      //   animation: isClicked ? "gradient 3s ease-in-out infinite" : "none",
      //   borderImageSlice: 1,
      //   borderImageSource: isClicked
      //     ? `linear-gradient(90deg, ${theme.colors.red[500]}, ${theme.colors.yellow[500]}, ${theme.colors.green[500]}, ${theme.colors.blue[500]}, ${theme.colors.purple[500]})`
      //     : "transparent",
      // }}
    >
      <Flex direction={{ base: "column" }} justify="center">
        <Box mb={{ base: "1px", "2xl": "1px" }} position="relative">
          <Heading size="md">{val}</Heading>
          <SimpleGrid columns={2} spacingX="0px">
            <ShowData
              card_annual_fee={card_annual_fee}
              cardType={cardType}
              month={month}
            ></ShowData>
            <Box position={"relative"}>
              <Image
                position={"absolute"}
                left="50%"
                transform="translate(-50%, -50%)"
                top="50%"
                src={image}
                w={{ base: "320px" }}
                h={{ base: "210px" }}
                borderRadius="20px"
              />
            </Box>
          </SimpleGrid>
        </Box>
      </Flex>
    </Card>
  );
}
