import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Grid,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import BenefitTreemap from "./components/BenefitTreemap";
import axios from "axios";
import BenefitPieOfPie from "./components/BenefitPieOfPie";
import ParentBenefitComponent from "./components/ParentBenefitComponent";
import BenefitPieOfPieForBottom5 from "./components/BenefitPieOfPieForBottom5";
import Loading from "../default/components/Loading";

export default function Settings() {
  const [benefitTopList, setBenefitTopList] = useState([]);
  const [benefitTreeList, setbBenefitTreeList] = useState([]);
  const [benefitBottompList, setBenefitBottompList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/benefitCluster/benefitTopAndBottom");
        const res2 = await axios.get("/benefitCluster/benefitTreeChart");
        // const res3 = await axios.get("/benefitCluster/benefitBottom");

        setBenefitTopList(res.data.top);
        setbBenefitTreeList(res2.data);
        setBenefitBottompList(res.data.bottom);
        setLoading(true);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  var data = [];

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {!loading ? (
        <Flex
          display="flex"
          marginTop="7.3rem"
          justifyContent="center"
          alignItems="center"
        >
          <Loading key="loading-spinner" />
        </Flex>
      ) : (
        <div>
          {/* <Grid
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
          data={benefitTreeList}
          val={"Card Benefit Map"}
        ></BenefitTreemap>
      </Grid> */}
          <Accordion allowMultiple>
            <AccordionItem mr="60px" ml="60px">
              <h2>
                <AccordionButton _expanded={{ color: "white" }}>
                  <Box as="span" flex="1" textAlign="left">
                    Card Benefit Tree Map
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <BenefitTreemap
                  data={benefitTreeList}
                  val={"Card Benefit Map"}
                ></BenefitTreemap>
              </AccordionPanel>
            </AccordionItem>
            <>
              {loading && (
                <AccordionItem mb="10px" mr="60px" ml="60px">
                  <h2>
                    <AccordionButton _expanded={{ color: "white" }}>
                      <Box as="span" flex="1" textAlign="left">
                        Card Benefit Bottom 5
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <BenefitPieOfPieForBottom5
                      data={benefitBottompList}
                      val="Card Benefit Bottom 5"
                      id="chartBottom5"
                    ></BenefitPieOfPieForBottom5>
                  </AccordionPanel>
                </AccordionItem>
              )}
            </>
          </Accordion>
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
            {loading && (
              <ParentBenefitComponent
                data={benefitTopList}
              ></ParentBenefitComponent>
            )}
          </Grid>
        </div>
      )}
    </Box>
  );
}
