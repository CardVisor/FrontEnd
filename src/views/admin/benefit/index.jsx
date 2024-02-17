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

export default function Settings() {
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
              <Box mr={10} maxWidth="200px">
                <Flex
                  direction={{ base: "row" }}
                  justify="flex-start"
                  alignItems="center"
                >
                  <Select
                    defaultValue="high"
                    size="xs"
                    mr={2}
                    onChange={handleSelectChange}
                  >
                    <option value="high">이용률 높은순</option>
                    <option value="low">이용률 낮은순</option>
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
                <Button colorScheme="purple" variant="solid" size="sm">
                  혜택 상세 조회
                </Button>
              </Box>
            </Flex>
          </Box>
        </Card>
      </Grid>
      <>
        {loading && (
          <>
            <Accordion allowMultiple>
              <AccordionItem mr="10px" ml="10px" mb="10px">
                <h2>
                  <AccordionButton _expanded={{ color: "white" }}>
                    <Box as="span" flex="1" textAlign="left">
                      <Text
                        color={textColor}
                        fontSize="22px"
                        fontWeight="700"
                        lineHeight="100%"
                      >
                        혜택 ALL
                      </Text>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <BenefitTreemap data={benefitTreeList}></BenefitTreemap>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
            <Grid
              mb="30px"
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
              <ParentBenefitComponent
                benefitList={benefitList}
                benefitTitle={benefitTitle}
                date={date}
              ></ParentBenefitComponent>
            </Grid>
          </>
        )}
      </>
    </Box>
  );
}
