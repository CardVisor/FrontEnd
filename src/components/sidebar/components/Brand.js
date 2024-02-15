import React from "react";

// Chakra imports
import { Flex, Image, useColorModeValue } from "@chakra-ui/react";

// Custom components
import { HorizonLogo } from "components/icons/Icons";
import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align="center" direction="column">
      <Image
        w="160px"
        mt="14px"
        mb="32px"
        src="https://farmfarmimagess.s3.ap-northeast-2.amazonaws.com/paylogo.png"
      ></Image>

      <HSeparator mb="20px" />
    </Flex>
  );
}

export default SidebarBrand;
