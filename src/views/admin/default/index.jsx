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

// Chakra imports
import { Box, Button, Flex, SimpleGrid, useColorMode } from "@chakra-ui/react";
// Assets
// Custom components

import React, { useEffect, useState } from "react";

import CustomerCount from "./components/AdminCustomerCount";
import KrwTotalAmount from "./components/KrwTotalAmount";
import AbroadTotalAmount from "./components/AbroadTotalAmount";
import LatestCurrencyData from "./components/LatestCurrencyData";
import AdminMonthTotalSpent from "./components/AdminMonthTotalSpent";
import AdminWeeklyTotalSpent from "./components/AdminWeeklyTotalSpent";
import AdminMonthTraffic from "./components/AdminMonthTraffic";
import AdminWeeklyTraffic from "./components/AdminWeeklyTraffic";
import AdminCheckTable from "./components/AdminCheckTable";
import AdminPayCheckTable from "./components/AdminPayCheckTable";
import AdminAbroadPayCheckTable from "./components/AdminAbroadPayCheckTable";
import AdminAbPayCheckTable from "./components/AdminAbPayCheckTable";
import { useRecoilValue } from "recoil";
import { mainState } from "../Recoil/MainState";
import Loading from "./components/Loading";

export default function UserReports() {
  // Chakra Color Mode
  const [showMonthly, setShowMonthly] = useState(true);
  const divToRemove = document.querySelector(".hi");
  const mState = useRecoilValue(mainState);
  const handleToggle = () => {
    setShowMonthly(!showMonthly);
  };
  useEffect(() => {
    if (mState === false) {
      if (divToRemove != null) divToRemove.remove();
    } else {
      // if (divToRemove != null) divToRemove.appendChild();
    }
  }, [mState]);
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 4 }}
        gap="20px"
        mb="20px"
      >
        <CustomerCount></CustomerCount>

        <KrwTotalAmount></KrwTotalAmount>
        <AbroadTotalAmount></AbroadTotalAmount>
        <LatestCurrencyData></LatestCurrencyData>
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
        {showMonthly ? (
          <>
            <AdminMonthTotalSpent handleToggle={handleToggle} />
            <AdminMonthTraffic />
          </>
        ) : (
          <>
            <AdminWeeklyTotalSpent handleToggle={handleToggle} />
            <AdminWeeklyTraffic />
          </>
        )}
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
        <AdminCheckTable />
        <AdminPayCheckTable></AdminPayCheckTable>
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px">
        <AdminAbroadPayCheckTable />
        <AdminAbPayCheckTable />
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
