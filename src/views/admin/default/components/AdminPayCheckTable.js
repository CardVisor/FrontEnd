import {
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

// Custom components
import Card from "components/card/Card";
import Menu from "./AdminMainMenu";
import axios from "axios";
export default function AdminPayCheckTable(props) {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const [clist, setCList] = useState([]);
  const [memo, setMemo] = useState();

  const formatNumber = (number) => {
    if (number > 0) {
      return new Intl.NumberFormat("ko-KR").format(number);
    } else if (number === 0) {
      return number;
    }
  };
  useEffect(() => {
    axios({
      method: "get",
      url: "/main/payAmoutTop5Card",
    })
      .then((res) => {
        setCList(res.data);
        let Message = "결제한 총금액 중에 가장 많이 사용한 카드입니다.";
        setMemo(Message);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Card
      direction="column"
      w="100%"
      px="0px"
      overflowX={{ sm: "scroll", lg: "hidden" }}
    >
      <Flex px="25px" justify="space-between" align="center">
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          결제금액 기준 카드 TOP5
        </Text>
        <Menu memo={memo} />
      </Flex>
      <Table variant="simple" color="gray.500" mb="24px">
        <Thead>
          <Tr>
            <Th pe="10px" borderColor={borderColor}>
              {" "}
              <Flex
                justify="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400"
              >
                카드이름
              </Flex>
            </Th>
            <Th pe="10px" borderColor={borderColor}>
              {" "}
              <Flex
                justify="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400"
              >
                결제건수
              </Flex>
            </Th>

            <Th pe="10px" borderColor={borderColor}>
              {" "}
              <Flex
                justify="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400"
              >
                총 결제금액
              </Flex>
            </Th>
            <Th pe="10px" borderColor={borderColor}>
              {" "}
              <Flex
                justify="space-between"
                align="center"
                fontSize={{ sm: "10px", lg: "12px" }}
                color="gray.400"
              >
                연회비
              </Flex>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {clist &&
            clist.map((card, index) => (
              <Tr key={`id${index}`}>
                <Td>
                  <Text
                    color={index === 0 ? "#5E3AFF" : textColor}
                    fontSize="sm"
                    fontWeight="700"
                  >
                    {card.card_name}
                  </Text>
                </Td>
                <Td>
                  <Flex align="center">
                    <Text
                      me="10px"
                      color={index === 0 ? "#5E3AFF" : textColor}
                      fontSize="sm"
                      fontWeight="700"
                    >
                      {card.count}건
                    </Text>
                  </Flex>
                </Td>
                <Td>
                  <Flex align="center">
                    <Text
                      me="10px"
                      color={index === 0 ? "#5E3AFF" : textColor}
                      fontSize="sm"
                      fontWeight="700"
                    >
                      {formatNumber(card.sumamount)}원
                    </Text>
                  </Flex>
                </Td>
                <Td>
                  <Flex align="center">
                    <Text
                      me="10px"
                      color={index === 0 ? "#5E3AFF" : textColor}
                      fontSize="sm"
                      fontWeight="700"
                    >
                      {formatNumber(card.card_annual_fee)}원
                    </Text>
                  </Flex>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </Card>
  );
}
