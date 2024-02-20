import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Grid,
  Checkbox,
  CheckboxGroup,
  Text,
  useColorModeValue,
  Select,
  IconButton,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import BenefitTreemap from "./components/BenefitTreemap";
import DatePickerMonthly from "./components/DatePicker";
import ParentBenefitComponent from "./components/ParentBenefitComponent";
import Card from "components/card/Card";
import { SearchIcon } from "@chakra-ui/icons";
import BenefitRecommendModal from "./components/BenefitRecommendModal";

export default function BenefitSetting() {
  const [benefitList, setBenefitist] = useState([]);
  const [benefitTreeList, setbBenefitTreeList] = useState([]);
  const [benefitTitle, setBenefitTitle] = useState();
  const [loading, setLoading] = useState(false);
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const [allPeriodChecked, setAllPeriodChecked] = useState(true);
  const [date, setDate] = useState(null);
  const [selectOption, setSelectOption] = useState("high");
  const [seachState, setSeachState] = useState(true);
  const handleCheckboxChange = (e) => {
    setDate(null);
    setAllPeriodChecked(e.target.checked);
  };

  const handleSelectChange = (e) => {
    setSelectOption(e.target.value);
  };
  const handleIconClick = async () => {
    var formattedDate = null;
    if (date) {
      const year = date.getFullYear();
      let month = date.getMonth() + 1; // getMonth는 0부터 시작하므로 1을 더해줍니다.
      month = month < 10 ? `0${month}` : month; // 월이 한 자리수일 경우 앞에 0을 붙여줍니다.
      formattedDate = `${year}-${month}`;
    }
    try {
      const res = await axios.post("/benefitCluster/benefitTopAndBottom", {
        date: formattedDate,
        selectOption: selectOption,
      });
      const res2 = await axios.post("/benefitCluster/benefitTreeChart", {
        date: formattedDate,
      });
      setBenefitist(res.data.list);
      setBenefitTitle(res.data.title);
      setbBenefitTreeList(res2.data);
      setLoading(true);
    } catch (err) {
      console.log(err);
    }
  };
  //검색 상태를 설정하는 useEffect
  useEffect(() => {
    if (allPeriodChecked === true) {
      setSeachState(true);
    } else if (allPeriodChecked === false && date !== null) {
      setSeachState(true);
    } else if (allPeriodChecked === false && date === null) {
      setSeachState(false);
    } else {
      setSeachState(false);
    }
  }, [date, selectOption, allPeriodChecked]);
  useEffect(() => {
    const fetchData = async () => {
      await handleIconClick();
    };

    fetchData();
  }, []);
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Grid
        mb="10px"
        mr="10px"
        ml="10px"
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
        <Card p="20px">
          <Box mb={{ base: "1px", "2xl": "1px" }} alignItems={"baseline"}>
            <Flex
              direction={{ base: "row" }}
              justify="flex-start"
              alignItems="center"
            >
              <Box mr={10}>
                <Checkbox
                  colorScheme="blue"
                  defaultChecked
                  size="lg"
                  onChange={handleCheckboxChange}
                >
                  <Text color={textColor} fontSize="15px" fontWeight="800">
                    전체 기간
                  </Text>
                </Checkbox>
              </Box>
              <Box mr={10}>
                <DatePickerMonthly
                  disabled={allPeriodChecked}
                  onChange={(date) => setDate(date)}
                  allPeriodChecked={allPeriodChecked}
                ></DatePickerMonthly>
              </Box>
              <Box mr={10} maxWidth="400px">
                <Flex
                  direction={{ base: "col" }}
                  justify="flex-start"
                  alignItems="center"
                >
                  <Text
                    mr={4}
                    color={textColor}
                    fontSize="15px"
                    fontWeight="800"
                    whiteSpace={"nowrap"}
                  >
                    혜택 적용 금액
                  </Text>
                  <Select
                    defaultValue="high"
                    size="xs"
                    mr={2}
                    onChange={handleSelectChange}
                  >
                    <option value="high">높은순</option>
                    <option value="low">낮은순</option>
                  </Select>
                  {seachState ? (
                    <IconButton
                      colorScheme="facebook"
                      aria-label="Search database"
                      icon={<SearchIcon />}
                      size="xs"
                      onClick={handleIconClick}
                      mr={4}
                    />
                  ) : (
                    <IconButton
                      colorScheme="gray"
                      aria-label="Search database"
                      icon={<SearchIcon />}
                      size="xs"
                      disabled={true}
                      mr={4}
                    />
                  )}
                </Flex>
              </Box>
              <Box mr={10} maxWidth="200px">
                <BenefitRecommendModal></BenefitRecommendModal>
              </Box>
            </Flex>
          </Box>
        </Card>
      </Grid>
      <>
        {loading && (
          <>
            <Accordion defaultIndex={[1]} allowMultiple>
              <AccordionItem mr="10px" ml="10px" mb="10px" mt="10px">
                <AccordionButton _expanded={{ color: "white" }}>
                  <Box as="span" flex="1" textAlign="left">
                    <Text
                      color={textColor}
                      fontSize="22px"
                      fontWeight="700"
                      lineHeight="100%"
                    >
                      혜택 분포 트리맵
                    </Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>

                <AccordionPanel pb={4}>
                  <BenefitTreemap data={benefitTreeList}></BenefitTreemap>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem mr="10px" ml="10px" mb="10px" mt="10px">
                <AccordionButton _expanded={{ color: "white" }}>
                  <Box as="span" flex="1" textAlign="left">
                    <Text
                      color={textColor}
                      fontSize="22px"
                      fontWeight="700"
                      lineHeight="100%"
                    >
                      혜택 순위 & 상세 정보
                    </Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>

                <AccordionPanel pb={4}>
                  <ParentBenefitComponent
                    benefitList={benefitList}
                    benefitTitle={benefitTitle}
                    date={date}
                    selectOption={selectOption}
                  ></ParentBenefitComponent>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </>
        )}
      </>
    </Box>
  );
}
