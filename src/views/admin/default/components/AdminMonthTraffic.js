import React, { createContext, useContext, useEffect, useState } from "react";

// Chakra imports
import { Box, Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import BarChart from "components/charts/BarChart";

// Custom components
import Card from "components/card/Card.js";


// Assets
import axios from "axios";

export const MonthTrafficContext = createContext();
export const TrafficProvider =(props) => {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const [total6transaction,setTotal6Transaction] = useState([]);
  const [transaction, setTransaction] = useState([]);
  const [month,setMonth] = useState([]);
  

// 총 6개월간거래건수
  useEffect(() => {
      
    axios({
      method: "get",
      url: "/main/selectMonthtransaction",
    })
      .then((res) => {
        console.log(res.data);
        setTotal6Transaction(res.data);
      })
      .catch((err) => {
        console.log("Error fetching currency data:", err);
      });
  }, []);
  useEffect(() => {
      
    axios({
      method: "get",
      url: "/main/selectPerMonthtransaction",
    })
      .then((res) => {
        console.log(res.data);
        setTransaction(res.data);
        const monthname = res.data.map(item => item.month);
        const formattedMonths = monthname.map(month => {
          const [year, monthNumber] = month.split('-');
          const date = new Date(parseInt(year), parseInt(monthNumber) - 1, 1);
          return date.toLocaleDateString('ko-KR', { month: 'long' }); // Get Korean full month name
      });
      setMonth(formattedMonths);
      console.log(month);
      })
      .catch((err) => {
        console.log("Error fetching currency data:", err);
      });
  }, []);

  const barChartDataMonthTraffic = [
    {
      name: "월 거래건수",
      data: transaction,
    },
  ];
 const barChartOptionsDailyTraffic = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      style: {
        fontSize: "12px",
        fontFamily: undefined,
      },
      onDatasetHover: {
        style: {
          fontSize: "12px",
          fontFamily: undefined,
        },
      },
      theme: "dark",
    },
    xaxis: {
      categories:month,
      show: false,
      labels: {
        show: true,
        style: {
          colors: "#A3AED0",
          fontSize: "14px",
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
      color: "black",
      labels: {
        show: true,
        style: {
          colors: "#CBD5E0",
          fontSize: "14px",
        },
      },
    },
    grid: {
      show: false,
      strokeDashArray: 5,
      yaxis: {
        lines: {
          show: true,
        },
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        type: "vertical",
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        colorStops: [
          [
            {
              offset: 0,
              color: "#4318FF",
              opacity: 1,
            },
            {
              offset: 100,
              color: "rgba(67, 24, 255, 1)",
              opacity: 0.28,
            },
          ],
        ],
      },
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: "40px",
      },
    },
  };
  return (
    <>
        <MonthTrafficContext.Provider
            value={{
              textColor,
              transaction,barChartDataMonthTraffic,
              barChartOptionsDailyTraffic,total6transaction,
            }}
        >
          {props.children}
           
        </MonthTrafficContext.Provider>
    </>
);

}

export default function AdminMonthTraffic(props) {
  const { ...rest } = props;
 
  return (
    <Card align='center' direction='column' w='100%' {...rest}>
      <TrafficProvider>
  <AdminMonthTrafficDisplay></AdminMonthTrafficDisplay>
  </TrafficProvider>
    </Card>
  );
}

function AdminMonthTrafficDisplay(props) {
  const { ...rest } = props;
  const{textColor,barChartDataMonthTraffic,barChartOptionsDailyTraffic,total6transaction} = useContext(MonthTrafficContext);
  
  return (
    <>
          <Flex justify='space-between' align='start' px='10px' pt='5px'>
        <Flex flexDirection='column' align='start' me='20px'>
          <Flex w='100%'>
            <Text
              me='auto'
              color='secondaryGray.600'
              fontSize='sm'
              fontWeight='500'>
              월 거래건수
            </Text>
          </Flex>
          <Flex align='end'>
            <Text
              color={textColor}
              fontSize='34px'
              fontWeight='700'
              lineHeight='100%'>
              {total6transaction}
            </Text>
            <Text
              ms='6px'
              color='secondaryGray.600'
              fontSize='sm'
              fontWeight='500'>
              Visitors
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Box h='240px' mt='auto'>
        <BarChart
          chartData={barChartDataMonthTraffic}
          chartOptions={barChartOptionsDailyTraffic}
        />
      </Box>
    </>
  );
}

