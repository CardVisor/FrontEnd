import {
    Flex,
    Table,
    Checkbox,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue,
  } from "@chakra-ui/react";
  import React, { useEffect, useMemo, useState } from "react";
  import {
    useGlobalFilter,
    usePagination,
    useSortBy,
    useTable,
  } from "react-table";
  
  // Custom components
  import Card from "components/card/Card";
  import Menu from "components/menu/MainMenu";
import axios from "axios";
  export default function AdminCheckTable(props) {

  
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
    const [clist,setCList] =useState([]);
    const [totalcount,setTotalCount] = useState();
    const formatNumber = (number) => {
      if (number>0) {
      
          return new Intl.NumberFormat('ko-KR').format(number);;
        }
      
    };
    useEffect(() => {
      axios({
        method: "get",
        url: "/main/selectTop5CardList",
      })
        .then((res) => {
          console.log("??");
          console.log(res.data);
          setCList(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
    useEffect(() => {
      axios({
        method: "get",
        url: "/main/totalCardRegAmount",
      })
        .then((res) => {
          console.log("??");
          console.log(res.data);
          setTotalCount(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
    return (
      <Card
        direction='column'
        w='100%'
        px='0px'
        overflowX={{ sm: "scroll", lg: "hidden" }}>
        <Flex px='25px' justify='space-between' align='center'>
          <Text
            color={textColor}
            fontSize='22px'
            fontWeight='700'
            lineHeight='100%'>
            회원이 제일 많이 사용하는 카드 TOP5
          </Text>
          <Menu />
        </Flex>
        <Table variant='simple' color='gray.500' mb='24px'>
          <Thead>

              <Tr >
                  <Th pe='10px'
                    borderColor={borderColor}> <Flex
                    justify='space-between'
                    align='center'
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color='gray.400'>NAME</Flex></Th>
                  <Th pe='10px'
                    borderColor={borderColor}> <Flex
                    justify='space-between'
                    align='center'
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color='gray.400'>PROGRESS</Flex></Th>
        
                  <Th pe='10px'
                    borderColor={borderColor}> <Flex
                    justify='space-between'
                    align='center'
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color='gray.400'>QUANTITY</Flex></Th>
                  <Th pe='10px'
                    borderColor={borderColor}> <Flex
                    justify='space-between'
                    align='center'
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color='gray.400'>ANUALFEE</Flex></Th>
            
                  
         
              </Tr>
          
          </Thead>
          <Tbody >
          {clist &&
                    clist.map((card, index) => (
                        <Tr key={`id${index}`}>
                            <Td>
                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                            {card.card_name}
                      </Text>
                                
                            </Td>
                            <Td>
                            <Flex align='center'>
                        <Text
                          me='10px'
                          color={textColor}
                          fontSize='sm'
                          fontWeight='700'>
                          {((card.col/totalcount)*100).toFixed(1)}%
                        </Text>
                      </Flex>
                              </Td>
                            <Td>
                            <Flex align='center'>
                        <Text
                          me='10px'
                          color={textColor}
                          fontSize='sm'
                          fontWeight='700'>
                         {card.col}
                        </Text>
                      </Flex>
                              </Td>
                            <Td>
                            <Flex align='center'>
                        <Text
                          me='10px'
                          color={textColor}
                          fontSize='sm'
                          fontWeight='700'>
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
  