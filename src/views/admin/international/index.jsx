/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2023 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React, { useEffect } from "react";

// Chakra imports
import { Box, useColorModeValue, SimpleGrid, Flex } from "@chakra-ui/react";

import TopTotalPayment from "./components/TopTotalPayment";
import TopComparePaymentSamePeriod from "./components/TopComparePaymentSamePeriod";
import TopHighestOrderPayment from "./components/TopHighestOrderPayment";
import WorldMap from "./components/WorldMap";
import "assets/css/international/International.css";
import { useRecoilValue } from "recoil";
import { interState } from "../Recoil/InternationalState";
import Loading from "../default/components/Loading";

export default function Marketplace() {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const internState = useRecoilValue(interState);
  const divToRemove = document.querySelector(".hi");
  useEffect(() => {
    if (internState === false) {
      if (divToRemove != null) divToRemove.remove();
    } else {
      // if (divToRemove != null) divToRemove.appendChild();
    }
  }, [internState]); // Empty dependency array ensures the effect runs only once on mount

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}
      <SimpleGrid
        columns={{ base: 3, md: 2, lg: 3, "2xl": 3 }}
        gap="20px"
        mb="20px"
      >
        <TopTotalPayment />
        <TopComparePaymentSamePeriod />
        <TopHighestOrderPayment />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1 }} gap="20px">
        <WorldMap />
      </SimpleGrid>
      <Flex
        className="hi"
        position="absolute"
        background="#F4F7FE"
        top="-100px"
        width="100%"
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="flex-start"
        paddingTop={350}
        filter="opacity(0.95)"
      >
        <Loading />
      </Flex>
    </Box>
  );
}
