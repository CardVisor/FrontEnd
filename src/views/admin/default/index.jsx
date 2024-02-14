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
import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";

import React, { useState } from "react";

import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import PieCard from "views/admin/default/components/PieCard";
import Tasks from "views/admin/default/components/Tasks";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import {
  columnsDataCheck,
  columnsDataComplex,
} from "views/admin/default/variables/columnsData";
import tableDataCheck from "views/admin/default/variables/tableDataCheck.json";
import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";
import CustomerCount from "./components/CustomerCount";
import KrwTotalAmount from "./components/KrwTotalAmount";
import AbroadTotalAmount from "./components/AbroadTotalAmount";
import LatestCurrencyData from "./components/LatestCurrencyData";
import AdminMonthTotalSpent from "./components/AdminMonthTotalSpent";
import AdminWeeklyTotalSpent from "./components/AdminWeeklyTotalSpent";
import AdminMonthTraffic from "./components/AdminMonthTraffic";
import AdminWeeklyTraffic from "./components/AdminWeeklyTraffic";
import AdminCheckTable from "./components/AdminCheckTable";
import TotalSpent from "./components/TotalSpent";

export default function UserReports() {
  // Chakra Color Mode
  const [showMonthly, setShowMonthly] = useState(true);

  const handleToggle = () => {
    setShowMonthly((prevShowMonthly) => !prevShowMonthly);
  };
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
        <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} />

        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px">
          <DailyTraffic />
          <PieCard />
        </SimpleGrid>
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px">
          <Tasks />
          <MiniCalendar h="100%" minW="100%" selectRange={false} />
        </SimpleGrid>
      </SimpleGrid>
    </Box>
  );
}
