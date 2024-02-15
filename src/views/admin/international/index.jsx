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
    Button,
    Flex,
    Grid,
    Link,
    Text,
    useColorModeValue,
    SimpleGrid,
} from "@chakra-ui/react";

// Custom components
//import Banner from "views/admin/international/components/Banner";
//import TableTopCreators from "views/admin/international/components/TableTopCreators";
//import HistoryItem from "views/admin/international/components/HistoryItem";
//import NFT from "components/card/NFT";
//import Card from "components/card/Card.js";

// Assets
//import Nft1 from "assets/img/nfts/Nft1.png";
//import Nft2 from "assets/img/nfts/Nft2.png";
//import Nft3 from "assets/img/nfts/Nft3.png";
//import Nft4 from "assets/img/nfts/Nft4.png";
//import Nft5 from "assets/img/nfts/Nft5.png";
//import Nft6 from "assets/img/nfts/Nft6.png";
//import Avatar1 from "assets/img/avatars/avatar1.png";
//import Avatar2 from "assets/img/avatars/avatar2.png";
//import Avatar3 from "assets/img/avatars/avatar3.png";
//import Avatar4 from "assets/img/avatars/avatar4.png";
//import tableDataTopCreators from "views/admin/international/variables/tableDataTopCreators.json";
//import { tableColumnsTopCreators } from "views/admin/international/variables/tableColumnsTopCreators";
//import TotalPayment from "./components/TopTotalPayment";
//import TableTopTotalPayment from "./components/TopTotalPayment";
//import TopInnerTotalPayment from "./components/TopTotalPayment";
import TopTotalPayment from "./components/TopTotalPayment";
import TopComparePaymentSamePeriod from "./components/TopComparePaymentSamePeriod";
import TopHighestOrderPayment from "./components/TopHighestOrderPayment";
import WorldMap from './components/WorldMap';

export default function Marketplace() {
    // Chakra Color Mode
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const textColorBrand = useColorModeValue("brand.500", "white");
    return (
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
            {/* Main Fields */}
            <SimpleGrid
                columns={{ base: 1, md: 2, lg: 3, "2xl": 3 }}
                gap="20px"
                mb="20px"
            >
                <TopTotalPayment />
                <TopComparePaymentSamePeriod />
                <TopHighestOrderPayment />
            </SimpleGrid>
            <SimpleGrid columns={{ base: 1 }} gap='20px' mb='20px'>
              <WorldMap />
            </SimpleGrid>
        </Box>
    );
}
