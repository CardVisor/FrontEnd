import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Grid,
  GridItem,
  Text,
  Box,
  Image,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import NFT from "components/card/NFTForModal";
import ColumnsTable from "views/admin/dataTables/components/ColumnsTable.js";
import tableDataColumns from "views/admin/dataTables/variables/tableDataColumns.json";
import RadarChart from "./RadarChart";
import RadarChart2 from "./RadarChart2";
import BarChart from "./BarChart";
import axios from "axios";
import BarChartTest from "./BarChartClear";

function Modal2(props) {
  const API_SERVER = process.env.REACT_APP_API_SERVER;
  const { isOpen, onClose, clickedCardInfo, month } = props;

  const card1 = clickedCardInfo[0] ? clickedCardInfo[0] : {};
  const card2 = clickedCardInfo[1] ? clickedCardInfo[1] : {};

  const [card1DataList, setCard1DataList] = useState([]);
  const [card2DataList, setCard2DataList] = useState([]);

  const [scrollBehavior, setScrollBehavior] = useState("inside");

  useEffect(() => {
    if (!card1.cardType || !card2.cardType) {
      return;
    }
    axios
      .get(
        API_SERVER +
          `CardCluster/MccChartsAll?month=${month}&type=${card1.cardType}`
      )
      .then((res) => {
        setCard1DataList({
          fit: res.data.의료건강피트니스,
          play: res.data.오락,
          edu: res.data.교육,
          etc: res.data.기타,
          beauty: res.data.미용,
          life: res.data.생활,
          cash: res.data.보험세금기타금융,
          mart: res.data.편의점마트잡화,
          alchol: res.data.술유흥,
          shopping: res.data.쇼핑,
          travle: res.data.여행숙박,
          hobby: res.data.취미여가,
          car: res.data.교통자동차,
          cafe: res.data.카페간식,
          food: res.data.식비,
          home: res.data.주거통신,
        });
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });

    axios
      .get(
        API_SERVER +
          `CardCluster/MccChartsAll?month=${month}&type=${card2.cardType}`
      )
      .then((res) => {
        setCard2DataList({
          fit: res.data.의료건강피트니스,
          play: res.data.오락,
          edu: res.data.교육,
          etc: res.data.기타,
          beauty: res.data.미용,
          life: res.data.생활,
          cash: res.data.보험세금기타금융,
          mart: res.data.편의점마트잡화,
          alchol: res.data.술유흥,
          shopping: res.data.쇼핑,
          travle: res.data.여행숙박,
          hobby: res.data.취미여가,
          car: res.data.교통자동차,
          cafe: res.data.카페간식,
          food: res.data.식비,
          home: res.data.주거통신,
        });
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, [card1.cardType, card2.cardType, month]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="6xl"
      scrollBehavior={scrollBehavior}
    >
      <ModalOverlay />
      <ModalContent>
        {/* maxW="1200px" */}
        <ModalHeader fontSize={"5xl"}>Card Comparison</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box p={5} shadow="md" borderWidth="1px">
            <Grid templateColumns="1fr 0.3fr 1fr">
              <GridItem colSpan={1} textAlign="right" justifySelf="end">
                <Heading size="md">{card1.card_name}</Heading>
                <Box marginY={4}>
                  <Image
                    src={card1.card_img_url}
                    w={{ base: "320px" }}
                    h={{ base: "210px" }}
                    borderRadius="20px"
                  />
                </Box>
              </GridItem>

              <GridItem colSpan={1} textAlign="center">
                <Box marginTop={110}>
                  <Heading color={"gray.400"} size="4xl" top="50%">
                    VS
                  </Heading>
                </Box>
              </GridItem>

              <GridItem colSpan={1} textAlign="left" justifySelf="start">
                <Heading size="md">{card2.card_name}</Heading>
                <Box marginY={4}>
                  <Image
                    src={card2.card_img_url}
                    w={{ base: "320px" }}
                    h={{ base: "210px" }}
                    borderRadius="20px"
                  />
                </Box>
              </GridItem>
            </Grid>
          </Box>
          <Box p={5} shadow="md" borderWidth="1px">
            <Tabs isFitted variant="enclosed">
              <TabList mb="1em">
                <Tab>요약 데이터 비교</Tab>
                <Tab>소비 군집 차트(Radar/Bar)</Tab>
                {/* <Tab>고객/결제 차트</Tab> */}
              </TabList>
              <TabPanels>
                <TabPanel>
                  <ColumnsTable
                    clickedCardInfo={clickedCardInfo}
                    month={month}
                  />
                </TabPanel>
                <TabPanel>
                  <Box p={5} shadow="md" borderWidth="1px">
                    <Text
                      fontSize="22px"
                      fontWeight="700"
                      lineHeight="100%"
                      textAlign="center"
                    >
                      RadarChart
                    </Text>
                    <Grid
                      templateColumns={{
                        base: "1fr",
                        lg: "1fr 1fr",
                      }}
                    >
                      <RadarChart
                        id="radar1Chart"
                        card1={card1}
                        card2={card2}
                        mccdata1={card1DataList}
                        mccdata2={card2DataList}
                        month={month}
                      ></RadarChart>
                      <RadarChart2
                        id="radar2Chart"
                        card1={card1}
                        card2={card2}
                        mccdata1={card1DataList}
                        mccdata2={card2DataList}
                        month={month}
                      ></RadarChart2>
                    </Grid>
                  </Box>

                  <Box p={5} shadow="md" borderWidth="1px" mt={10}>
                    <Text
                      fontSize="22px"
                      fontWeight="700"
                      lineHeight="100%"
                      textAlign="center"
                    >
                      StackedBarChart
                    </Text>
                    <BarChart
                      id="barChart"
                      card1={card1}
                      card2={card2}
                      mccdata1={card1DataList}
                      mccdata2={card2DataList}
                      month={month}
                    ></BarChart>
                  </Box>
                </TabPanel>
                <TabPanel>
                  <p>다중 그래프 하나 추가 할것</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="purple"
            backgroundColor={"#5E3AFF"}
            mr={3}
            onClick={onClose}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default Modal2;
