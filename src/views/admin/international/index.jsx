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

import React from "react";

// Chakra imports
import {
    Box,
    useColorModeValue,
    SimpleGrid,
} from "@chakra-ui/react";

import TopTotalPayment from "./components/TopTotalPayment";
import TopComparePaymentSamePeriod from "./components/TopComparePaymentSamePeriod";
import TopHighestOrderPayment from "./components/TopHighestOrderPayment";
import WorldMap from './components/WorldMap';
import "assets/css/international/International.css";

export default function Marketplace() {
    // Chakra Color Mode
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const textColorBrand = useColorModeValue("brand.500", "white");
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
        </Box>
    );
}
