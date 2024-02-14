// Chakra imports

import {
    Box,
    Button,
    Flex,
    Icon,
    Text,
    useColorModeValue,
  } from "@chakra-ui/react";
  // Custom components
  import Card from "components/card/Card.js";
  import LineChart from "components/charts/LineChart";
  import React, { createContext,  useContext, useEffect, useState } from "react";
  import { IoCheckmarkCircle } from "react-icons/io5";
  import { MdBarChart, MdOutlineCalendarToday } from "react-icons/md";
  // Assets
  import { RiArrowUpSFill } from "react-icons/ri";

import axios from "axios";


  
   
  export const TotalSpentcontext = createContext();
  export const TotalProvider = (props) => {
   
    const [data, setData] = useState([]);
const [lastmonthdata, setLastMonthData] = useState([]);
const [month, setMonth] = useState([]);
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const textColorSecondary = useColorModeValue("secondaryGray.600", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    const iconColor = useColorModeValue("brand.500", "white");
    const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    const [pertotal,setPerTotal] = useState();
    const [increse,setIncrese] = useState();
    const bgHover = useColorModeValue(
      { bg: "secondaryGray.400" },
      { bg: "whiteAlpha.50" }
    );
    const bgFocus = useColorModeValue(
      { bg: "secondaryGray.300" },
      { bg: "whiteAlpha.100" }
    );



// 6개월간 총결제내역 작년 올해 비교 상승률
const formatpercent = (number) => {
  // Check if the input is a valid number
  if (typeof number === 'number') {
    // Perform formatting based on the sign of the number
    if (number > 0) {
      return "+" + number.toFixed(1) + "%"; // Using toFixed to format to two decimal places
    } else if (number < 0) {
      return "-" + Math.abs(number).toFixed(1) + "%"; // Using Math.abs to handle negative numbers
    } else {
      return "0.0%"; // Handle zero case
    }
  } else {
    return "Invalid input"; // Handle invalid input
  }
}
useEffect(() => {
      
  axios({
    method: "get",
    url: "/main/totalIncrese",
  })
    .then((res) => {
      console.log(res.data);
      setIncrese(res.data);
    })
    .catch((err) => {
      console.log("Error fetching currency data:", err);
    });
}, []);

    //총 결제내역 숫자바꾸기
    const formatabroad = (number) => {
      if (number !== undefined && number !== null) {
        if (number > 0) {
          if (number >= 100) {
            return `${(number / 100).toFixed(2)} 억`;
          } else {
            return `${number.toString()}만`;
          }
        } else {
          // Handle negative numbers if needed
          return `${number.toString()}`;
        }
      } else {
        return 'N/A'; // Handle undefined or null case
      }
    }
    
    // 6개월간 총결제내역
    useEffect(() => {
      
      axios({
        method: "get",
        url: "/main/perMonthTotalAmount",
      })
        .then((res) => {
          console.log(res.data);
          setPerTotal(res.data);
        })
        .catch((err) => {
          console.log("Error fetching currency data:", err);
        });
    }, []);
//6개월간 매월결제내역
    useEffect(() => {
        axios({
          method: "get",
          url: "/main/selectPerMonthamount",
        })
        .then((res) => {
          console.log("Data fetched successfully");
          console.log(res.data);
          // Format the data received from the API
     
  

          const monthname = res.data.map(item => item.month);
          const formattedMonths = monthname.map(month => {
            const [year, monthNumber] = month.split('-');
            const date = new Date(parseInt(year), parseInt(monthNumber) - 1, 1);
            return date.toLocaleDateString('ko-KR', { month: 'long' }); // Get Korean full month name
        });
          setMonth(formattedMonths);
          console.log(month);
          const formattedNumbers = res.data.map(item => {
            if (item.total_amount >= 1000000) {
                return (item.total_amount / 1000000).toFixed(1); // Convert to millions and append 'M'
            } else {
                return item.total_amount.toLocaleString(); // Format number with comma separators
            }
        });
         setData(formattedNumbers);
         console.log("setData :"+formattedNumbers);
        })
        .catch((err) => {
          console.log("Error fetching data:", err);
        });
      }, []);
      //작년6개월간 매월결제내역
      useEffect(() => {
        axios({
          method: "get",
          url: "/main/selectLastYearPerMonthamount",
        })
        .then((res) => {
          console.log("Data fetched successfully");
          console.log(res.data);
          // Format the data received from the API
    
          const formattedNumbers = res.data.map(item => {
            if (item.total_amount >= 1000000) {
                return (item.total_amount / 1000000).toFixed(2); // Convert to millions and append 'M'
            } else {
                return item.total_amount.toLocaleString(); // Format number with comma separators
            }
        });
          setLastMonthData(formattedNumbers);
        })
        .catch((err) => {
          console.log("Error fetching data:", err);
        });
      }, []);
       const lineChartDataTotalSpent1 = [
        
        {
          name: "올해",
          data: data,
        },
        {
          name: "작년",
          data: lastmonthdata,
        },
      ];
      console.log(lineChartDataTotalSpent1);
      const lineChartOptionsTotalSpent1 = {
        chart: {
          toolbar: {
            show: false,
          },
          dropShadow: {
            enabled: true,
            top: 13,
            left: 0,
            blur: 10,
            opacity: 0.1,
            color: "#4318FF",
          },
        },
        colors: ["#4318FF", "#39B8FF"],
        markers: {
          size: 0,
          colors: "white",
          strokeColors: "#7551FF",
          strokeWidth: 3,
          strokeOpacity: 0.9,
          strokeDashArray: 0,
          fillOpacity: 1,
          discrete: [],
          shape: "circle",
          radius: 2,
          offsetX: 0,
          offsetY: 0,
          showNullDataPoints: true,
        },
        tooltip: {
          theme: "dark",
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
          type: "line",
        },
        xaxis: {
          type: "numeric",
          categories:month,
          labels: {
            style: {
              colors: "#A3AED0",
              fontSize: "12px",
              fontWeight: "500",
            },
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        yaxis: {
          show: false,
        },
        legend: {
          show: false,
        },
        grid: {
          show: false,
          column: {
            color: ["#7551FF", "#39B8FF"],
            opacity: 0.5,
          },
        },
        color: ["#7551FF", "#39B8FF"],
      };
    return (
      <>
          <TotalSpentcontext.Provider
              value={{
                  lineChartOptionsTotalSpent1,increse,
                  lineChartDataTotalSpent1,formatpercent,
                  textColor,pertotal,formatabroad,
                  textColorSecondary,boxBg,iconColor,bgButton,bgHover,bgFocus,
              }}
          >
            {props.children}
             
          </TotalSpentcontext.Provider>
      </>
  );



  }
  export default function AdminMonthTotalSpent({handleToggle}) {
   
   return (
    <Card
    justifyContent='center'
    align='center'
    direction='column'
    w='100%'
    mb='0px'
   >
    <TotalProvider>
    <DisplayTotal handleToggle={handleToggle}></DisplayTotal>
    </TotalProvider>
    </Card>
   ) ; 
  };
  export  function DisplayTotal({handleToggle}) {
    
  const{ textColor,formatabroad,increse,
    lineChartOptionsTotalSpent1,formatpercent,
    lineChartDataTotalSpent1,pertotal,
  textColorSecondary,boxBg,iconColor,bgButton,bgHover,bgFocus} = useContext(TotalSpentcontext);
 
    return (
 <>  
        <Flex justify='space-between' ps='0px' pe='20px' pt='5px'>
          <Flex align='center' w='100%'>
            <Button
              bg={boxBg}
              fontSize='sm'
              fontWeight='500'
              color={textColorSecondary}
              borderRadius='7px'
              onClick={handleToggle}>
              <Icon
                as={MdOutlineCalendarToday}
                color={textColorSecondary}
                me='4px'
              />
              This month
            </Button>
            <Button
              ms='auto'
              align='center'
              justifyContent='center'
              bg={bgButton}
              _hover={bgHover}
              _focus={bgFocus}
              _active={bgFocus}
              w='37px'
              h='37px'
              lineHeight='100%'
              borderRadius='10px'
              >
              <Icon as={MdBarChart} color={iconColor} w='24px' h='24px' />
            </Button>
          </Flex>
        </Flex>
        <Flex w='100%' flexDirection={{ base: "column", lg: "row" }}>
          <Flex flexDirection='column' me='20px' mt='28px'>
            <Text
              color={textColor}
              fontSize='34px'
              textAlign='start'
              fontWeight='700'
              lineHeight='100%'>
              {formatabroad(pertotal)}
            </Text>
            <Flex align='center' mb='20px'>
              <Text
                color='secondaryGray.600'
                fontSize='sm'
                fontWeight='500'
                mt='4px'
                me='12px'>
                총 결제내역
              </Text>
              <Flex align='center'>
                <Icon as={RiArrowUpSFill} color='green.500' me='2px' mt='2px' />
                <Text color='green.500' fontSize='sm' fontWeight='700'>
                 {formatpercent(increse)}
                </Text>
              </Flex>
            </Flex>
  
            <Flex align='center'>
              <Icon as={IoCheckmarkCircle} color='green.500' me='4px' />
              <Text color='green.500' fontSize='md' fontWeight='700'>
                On track
              </Text>
            </Flex>
          </Flex>
          <Box minH='260px' minW='75%' mt='auto'>
      
                <LineChart
                    chartData={lineChartDataTotalSpent1}
                    chartOptions={lineChartOptionsTotalSpent1}
                />
        
          </Box>
        </Flex>

      </>
    );
  }
  