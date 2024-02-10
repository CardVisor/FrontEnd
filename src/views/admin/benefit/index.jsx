import { Box, Grid, SimpleGrid } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import BenefitTreemap from "./components/BenefitTreemap";
import axios from "axios";

export default function Settings() {
  const [benefitList, setBenefitList] = useState([]);
  useEffect(() => {
    axios({
      method: "get",
      url: "/benefitCluster/mcc",
    })
      .then((res) => {
        console.log(res.data);
        setBenefitList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  var data = [
    {
      name: "Beer styles",
      children: [
        {
          name: "Pale Ales",
          children: [
            { name: "American Amber Ale", value: 1 },
            { name: "American Pale Ale", value: 1 },
            { name: "Blonde Ale", value: 1 },
            { name: "English-Style Bitter", value: 1 },
            { name: "English-Style", value: 1 },
          ],
        },
        {
          name: "Dark Lagers",
          children: [
            { name: "American Amber Lager", value: 1 },
            { name: "German-Style Dunkel", value: 1 },
            { name: "German-Style Marzen / Oktoberfest", value: 1 },
            { name: "German-Style Schwarzbier", value: 1 },
            { name: "Vienna-Style Lager", value: 1 },
          ],
        },
        {
          name: "Brown Ales",
          children: [
            { name: "American Brown Ale", value: 1 },
            { name: "English-Style Brown Ale", value: 1 },
            { name: "English-Style Mild", value: 1 },
          ],
        },
        {
          name: "India Pale Ales",
          children: [
            { name: "American IPA", value: 1 },
            { name: "English-Style IPA", value: 1 },
            { name: "Imperial India Pale Ale", value: 1 },
            { name: "New England IPA", value: 1 },
          ],
        },
        {
          name: "Wheat Beers",
          children: [
            { name: "American-Style Wheat Wine Ale", value: 1 },
            { name: "American Wheat", value: 1 },
            { name: "Belgian-Style Witbier", value: 1 },
            { name: "Berliner-Style Weisse", value: 1 },
            { name: "German-Style Dunkelweizen", value: 1 },
            { name: "German-Style Hefeweizen", value: 1 },
          ],
        },
        {
          name: "Strong Ales",
          children: [
            { name: "American Barley Wine", value: 1 },
            { name: "American Imperial Red Ale", value: 1 },
            { name: "British-S", value: 1 },
            { name: "English-Style Old Ale", value: 1 },
          ],
        },
      ],
    },
  ];

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Grid
        mb="30px"
        mr="60px"
        ml="60px"
        templateColumns={{
          base: "1fr",
          lg: "4.7fr",
        }}
        templateRows={{
          base: "repeat(1, 1fr)",
          lg: "1fr",
        }}
        gap={{ base: "20px", xl: "20px" }}
      >
        <BenefitTreemap
          data={benefitList}
          val={"Benefit 군집 요약"}
        ></BenefitTreemap>
      </Grid>
    </Box>
  );
}
