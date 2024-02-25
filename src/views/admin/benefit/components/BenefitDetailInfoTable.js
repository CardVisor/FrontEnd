import {
  Flex,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "components/card/Card";
//import { benefitState } from "views/admin/Recoil/BenefitCluster";
//import { useSetRecoilState } from "recoil";
export default function BenefitDetailInfoTable(props) {
  //const SetbState = useSetRecoilState(benefitState);
  const [tableloading,SetTableLoading]= useState(true);
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const { clickedChartEl, data, clickFlag, date, selectOption } = props;
  const [benefitList, setBenefitList] = useState();
  const formatNumber = (number) => {
    if (number > 0) {
      return new Intl.NumberFormat("ko-KR").format(number);
    } else if (number === 0) {
      return "-";
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      SetTableLoading(true);
      // SetbState(true);
      // 비동기 작업을 수행하는 함수를 따로 선언
      var formattedDate = null;
      if (date) {
        const year = date.getFullYear();
        let month = date.getMonth() + 1; // getMonth는 0부터 시작하므로 1을 더해
        month = month < 10 ? `0${month}` : month;
        formattedDate = `${year}-${month}`;
      }
      var senddata = {
        cateName: clickedChartEl,
        date: formattedDate,
        selectOption: selectOption,
      };

      try {
        const res = await axios({
          method: "post",
          url: "/benefitCluster/benefitDetail",
          data: senddata,
        });
        setBenefitList(res.data);
        SetTableLoading(false);
        // SetbState(false);
      } catch (err) {}
    };

    if (clickFlag) {
      // clickFlag가 true인 경우에만 fetchData 함수를 호출
      fetchData();
    }
  }, [clickedChartEl, data, clickFlag]);
  return (
    <Card
      direction="column"
      w="100%"
      px="0px"
      overflowX={{ sm: "scroll", lg: "hidden" }}
    >
       {tableloading ? (
        <Flex marginLeft={21}>
          <Spinner />
          </Flex>
        ) : (
          <div>
      <Flex px="25px" justify="space-between" align="center">
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          선택 카테고리 : {clickedChartEl}
        </Text>
      </Flex>
      <Table variant="simple" color="gray.500" mb="24px">
        <Thead>
          <Tr>
            <Th pe="10px" borderColor={borderColor}>
              <Flex
                justify="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400"
              >
                혜택명
              </Flex>
            </Th>
            <Th pe="10px" borderColor={borderColor}>
              <Flex
                justify="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400"
              >
                혜택 누적 금액(원)
              </Flex>
            </Th>
            <Th pe="10px" borderColor={borderColor}>
              <Flex
                justify="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400"
              >
                혜택 적용 건수
              </Flex>
            </Th>
            <Th pe="10px" borderColor={borderColor}>
              <Flex
                justify="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400"
              >
                인당 수혜 금액(원)
              </Flex>
            </Th>
            <Th pe="10px" borderColor={borderColor}>
              <Flex
                justify="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400"
              >
                연관 카드 수
              </Flex>
            </Th>

            <Th pe="10px" borderColor={borderColor}>
              <Flex
                justify="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400"
              >
                혜택 최고 적립 카드(원)
              </Flex>
            </Th>
            <Th pe="10px" borderColor={borderColor}>
              <Flex
                justify="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400"
              >
                혜택 최다 사용 카드(건)
              </Flex>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {benefitList &&
            benefitList.map((b, index) => (
              <Tr key={`id${index}`} pe="10px" borderColor={borderColor}>
                <Td
                  borderRight={"1px"}
                  borderRightColor={borderColor}
                  borderColor={borderColor}
                  borderBottom={"1px"}
                  borderBottomStyle={"dashed"}
                >
                  <Text
                    color={textColor}
                    fontSize={{ sm: "13px" }}
                    fontWeight="700"
                  >
                    {b.benefit_detail}
                  </Text>
                </Td>
                <Td
                  borderColor={borderColor}
                  borderBottom={"1px"}
                  borderBottomStyle={"dashed"}
                >
                  <Flex align="center">
                    <Text
                      me="10px"
                      color={textColor}
                      fontSize="sm"
                      fontWeight="700"
                    >
                      {formatNumber(b.total_sum)}
                    </Text>
                  </Flex>
                </Td>
                <Td
                  borderColor={borderColor}
                  borderBottom={"1px"}
                  borderBottomStyle={"dashed"}
                >
                  <Flex align="center">
                    <Text
                      me="10px"
                      color={textColor}
                      fontSize="sm"
                      fontWeight="700"
                    >
                      {formatNumber(b.total_count)}
                    </Text>
                  </Flex>
                </Td>

                <Td
                  borderColor={borderColor}
                  borderBottom={"1px"}
                  borderBottomStyle={"dashed"}
                >
                  <Flex align="center">
                    <Text
                      me="10px"
                      color={textColor}
                      fontSize="sm"
                      fontWeight="700"
                    >
                      {formatNumber(b.amount_per_person)}
                    </Text>
                  </Flex>
                </Td>
                <Td
                  borderColor={borderColor}
                  borderBottom={"1px"}
                  borderBottomStyle={"dashed"}
                >
                  <Flex align="center">
                    <Text
                      me="10px"
                      color={textColor}
                      fontSize="sm"
                      fontWeight="700"
                    >
                      {formatNumber(b.related_card_cnt)}
                    </Text>
                  </Flex>
                </Td>
                <Td
                  borderColor={borderColor}
                  borderBottom={"1px"}
                  borderBottomStyle={"dashed"}
                >
                  <Flex align="center">
                    <Text
                      me="10px"
                      color={textColor}
                      fontSize={{ sm: "10px" }}
                      fontWeight="700"
                    >
                      {b.max_sum === undefined
                        ? "-"
                        : b.max_sum_card_name +
                          " (" +
                          formatNumber(b.max_sum) +
                          ")"}
                    </Text>
                  </Flex>
                </Td>
                <Td
                  borderColor={borderColor}
                  borderBottom={"1px"}
                  borderBottomStyle={"dashed"}
                >
                  <Flex align="center">
                    <Text
                      me="10px"
                      color={textColor}
                      fontSize={{ sm: "10px" }}
                      fontWeight="700"
                    >
                      {b.max_cnt === undefined
                        ? "-"
                        : b.max_cnt_card_name +
                          " (" +
                          formatNumber(b.max_cnt) +
                          ")"}
                    </Text>
                  </Flex>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
      </div>)}
    </Card>
  );
}
