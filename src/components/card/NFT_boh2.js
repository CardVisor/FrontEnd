// Chakra imports
import {
  AvatarGroup,
  Avatar,
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Link,
  Text,
  useColorModeValue,
  SimpleGrid,
  Heading,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
// Assets
import React, { useState } from "react";

import { IoHeart, IoHeartOutline } from "react-icons/io5";
import AssetDoughnutChart from "views/admin/dataTables/components/DonutChart";
import ShowData from "views/admin/dataTables/components/ShowData";

export default function NFT(props) {
  const {
    image,
    name,
    author,
    bidders,
    download,
    currentbid,
    val,
    card_annual_fee,
  } = props;
  console.log(card_annual_fee);
  const textColor = useColorModeValue("navy.700", "white");
  const textColorBid = useColorModeValue("brand.500", "white");
  return (
    <Card p="20px">
      <Flex direction={{ base: "column" }} justify="center">
        <Box mb={{ base: "1px", "2xl": "1px" }} position="relative">
          {/* <Text fontSize='xl'>{val}</Text> */}
          <Heading size="md">{val}</Heading>
          <SimpleGrid columns={2} spacingX="0px">
            <ShowData card_annual_fee={card_annual_fee}></ShowData>
            <Image
              mt="50px"
              ml="100px"
              top="50%"
              src={image}
              w={{ base: "320px" }}
              h={{ base: "210px" }}
              borderRadius="20px"
            />
          </SimpleGrid>
        </Box>
      </Flex>
    </Card>
  );
}
