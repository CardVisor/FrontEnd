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
import { Box, SimpleGrid, Grid } from "@chakra-ui/react";
import DevelopmentTable from "views/admin/dataTables/components/DevelopmentTable";
import CheckTable from "views/admin/dataTables/components/CheckTable";
import ColumnsTable from "views/admin/dataTables/components/ColumnsTable";
import ComplexTable from "views/admin/dataTables/components/ComplexTable";
import {
  columnsDataDevelopment,
  columnsDataCheck,
  columnsDataColumns,
  columnsDataComplex,
} from "views/admin/dataTables/variables/columnsData";
import tableDataDevelopment from "views/admin/dataTables/variables/tableDataDevelopment.json";
import tableDataCheck from "views/admin/dataTables/variables/tableDataCheck.json";
import tableDataColumns from "views/admin/dataTables/variables/tableDataColumns.json";
import tableDataComplex from "views/admin/dataTables/variables/tableDataComplex.json";
import React from "react";
import NFT from "components/card/NFT_boh";
import NFT2 from "components/card/NFT_boh2"
import AssetDoughnutChart from "./components/DonutChart";

export default function Settings() {
  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
       <Grid
       mb='30px'
       mr='60px'
       ml='60px'
        templateColumns={{
          base: "1fr",
          lg: "1.2fr 3.5fr",
        }}
        templateRows={{
          base: "repeat(1, 1fr)",
          lg: "1fr",
        }}
        gap={{ base: "20px", xl: "20px" }}>
            <NFT
            />
            <NFT2 
            val="MY DEEP BLUE CARD 군집 요약" 
            image={"https://farmfarmimagess.s3.ap-northeast-2.amazonaws.com/cdCreaditBNBC47.png" }

            />
           
      </Grid>
      <Grid
       mb='30px'
       mr='60px'
       ml='60px'
       //mt = '10px'
        templateColumns={{
          base: "1fr",
          lg: "1.2fr 3.5fr",
        }}
        templateRows={{
          base: "repeat(1, 1fr)",
          lg: "1fr",
        }}
        gap={{ base: "20px", xl: "20px" }}>
            <NFT
              //image={"https://farmfarmimagess.s3.ap-northeast-2.amazonaws.com/cdCreaditBNBC47.png" }
              currentbid="0.91 ETH"
              download="#"
            />
            <NFT2 
            val="MY DEEP BLUE CARD 군집 요약" 
            image={"https://farmfarmimagess.s3.ap-northeast-2.amazonaws.com/cdCreaditBNBC47.png" }

            />
           
      </Grid>
      <Grid
       mb='30px'
       mr='60px'
       ml='60px'
       //mt = '10px'
        templateColumns={{
          base: "1fr",
          lg: "1.2fr 3.5fr",
        }}
        templateRows={{
          base: "repeat(1, 1fr)",
          lg: "1fr",
        }}
        gap={{ base: "20px", xl: "20px" }}>
            <NFT
              currentbid="0.91 ETH"
              download="#"
            />
            <NFT2 
            val="MY DEEP BLUE CARD 군집 요약" 
            image={"https://farmfarmimagess.s3.ap-northeast-2.amazonaws.com/cdCreaditBNBC47.png" }

            />
           
      </Grid>
      <Grid
       mb='20px'
        templateColumns={{
          base: "1fr",
          lg: "1fr 3.5fr",
        }}
        templateRows={{
          base: "repeat(3, 1fr)",
          lg: "1fr",
        }}
        gap={{ base: "20px", xl: "20px" }}>
            <NFT
              //image={"https://farmfarmimagess.s3.ap-northeast-2.amazonaws.com/cdCreaditBNBC47.png" }
              currentbid="0.91 ETH"
              download="#"
            />
            <NFT2 val="MY SHINAN GOGO CARD 군집 요약"></NFT2>
           
      </Grid>
      <Grid
       mb='20px'
        templateColumns={{
          base: "1fr",
          lg: "1fr 3.5fr",
        }}
        templateRows={{
          base: "repeat(3, 1fr)",
          lg: "1fr",
        }}
        gap={{ base: "20px", xl: "20px" }}>
            <NFT
              //image={"https://farmfarmimagess.s3.ap-northeast-2.amazonaws.com/cdCreaditBNBC47.png" }
              currentbid="0.91 ETH"
              download="#"
            />
            <NFT2 val="MY DEEP 어쩔티비 CARD 군집 요약"></NFT2>
           
      </Grid>
    </Box>
  );
}

{/* <DevelopmentTable
          columnsData={columnsDataDevelopment}
          tableData={tableDataDevelopment}
        />
        <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} />
        <ColumnsTable
          columnsData={columnsDataColumns}
          tableData={tableDataColumns}
        />
        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        /> */}