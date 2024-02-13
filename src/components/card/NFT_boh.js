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
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
// Assets
import React, { useState } from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import AssetDoughnutChart from "views/admin/dataTables/components/DonutChart";

export default function NFT(props) {
  const { image, name, author, bidders, download, currentbid, val } = props;
  const [like, setLike] = useState(false);
  const textColor = useColorModeValue("navy.700", "white");
  const textColorBid = useColorModeValue("brand.500", "white");
  return (
    <Card p="20px">
      <Flex direction={{ base: "column" }} justify="center">
        <Box mb={{ base: "1px", "2xl": "1px" }} position="relative">
          <AssetDoughnutChart></AssetDoughnutChart>
        </Box>
      </Flex>
    </Card>
  );
}
