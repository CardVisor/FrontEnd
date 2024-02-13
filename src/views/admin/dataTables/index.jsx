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
import React, { useEffect, useState } from "react";
import NFT from "components/card/NFT_boh";
import NFT2 from "components/card/NFT_boh2";
import AssetDoughnutChart from "./components/DonutChart";
import axios from "axios";
import FilterComponent from "./components/DayFilter";

export default function Settings() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: "/CardCluster/Cards",
    })
      .then((res) => {
        const filteredCards = res.data.map((card) => {
          return {
            card_name: card.cardName,
            card_img_url: card.cardImgUrl,
            card_annual_fee: card.cardAnnualFee,
          };
        });

        // 추출된 카드 정보 배열을 상태로 설정
        setCards(filteredCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <FilterComponent></FilterComponent>
      {cards &&
        cards.map((card) => (
          //console.log(card.card_annual_fee),
          <Grid
            mb="30px"
            mr="60px"
            ml="60px"
            templateColumns={{
              base: "1fr",
              lg: "1.5fr 3.5fr",
            }}
            templateRows={{
              base: "repeat(1, 1fr)",
              lg: "1fr",
            }}
            gap={{ base: "20px", xl: "20px" }}
          >
            <NFT />
            <NFT2
              card_annual_fee={card.card_annual_fee}
              val={card.card_name}
              image={card.card_img_url}
            />
          </Grid>
        ))}
    </Box>
  );
}

{
  /* <DevelopmentTable
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
        /> */
}
