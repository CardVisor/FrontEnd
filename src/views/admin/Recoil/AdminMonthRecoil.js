import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@chakra-ui/react";
import LineChart from "components/charts/LineAreaChart";
import { useRecoilValue } from "recoil";
import { mainState } from "./MainState";

const YourComponent = (props) => {
  const [lineChartDataTotalSpent, setLineChartDataTotalSpent] = useState([]);
  const [optionLineChart, setOptionLineChart] = useState({});
  const [checkstat, setCheckstat] = useState(false);
  const mState = useRecoilValue(mainState);
  const [month, setMonth] = useState([]);
  const [data1, setData1] = useState([]);
  const [lastmonthdata, setLastMonthData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setCheckstat(checkstat);
      try {
        const [res1] = await Promise.all([
          axios.get("/main/selectLastYearAndPerMonthamount"),
        ]);

        const monthname = res1.data[1].map((item) => item.month);

        const formattedMonths = monthname.map((month) => {
          const [year, monthNumber] = month.split("-");
          return monthNumber + "월";
        });

        setMonth(formattedMonths);

        const formattedNumbers1 = res1.data[1].map((item) => {
          if (item.total_amount >= 1000000) {
            return (item.total_amount / 1000000).toFixed(1); // Convert to millions and append 'M'
          } else {
            return item.total_amount.toLocaleString(); // Format number with comma separators
          }
        });
        setData1(formattedNumbers1); //data

        const formattedNumbers = res1.data[0].map((item) => {
          if (item.total_amount >= 1000000) {
            return (item.total_amount / 1000000).toFixed(2); // Convert to millions and append 'M'
          } else {
            return item.total_amount.toLocaleString(); // Format number with comma separators
          }
        });
        setLastMonthData(formattedNumbers); //lastmonthdata

        const lineChartDataTotalSpent1 = [
          {
            name: "올해",
            data: data1,
          },
          {
            name: "작년",
            data: lastmonthdata,
          },
        ];

        setLineChartDataTotalSpent(lineChartDataTotalSpent1);
        console.log(lineChartDataTotalSpent1);

        const lineChartOptionsTotalSpent1 = {
          chart: {
            toolbar: {
              show: false,
            },
            dropShadow: {
              enabled: true,
              top: 0,
              left: 0,
              blur: 10,
              opacity: 0.1,
              color: "#000000",
            },
          },

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
            showNullDataPoints: false,
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
            categories: month,
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
          colors: ["#4318FF", "#39B8FF"],
        };
        setOptionLineChart(lineChartOptionsTotalSpent1);
        console.log(lineChartOptionsTotalSpent1);
        setCheckstat(true);
      } catch (error) {
        console.error("데이터 가져오기 오류:", error);
      }
    };

    fetchData();
  }, [checkstat, mState]);

  return (
    <>
      {checkstat && (
        <>
          <Box minH="260px" minW="75%" mt="auto">
            {lineChartDataTotalSpent.length > 0 &&
              optionLineChart.xaxis &&
              optionLineChart.xaxis.categories.length > 0 && (
                <LineChart
                  chartData={lineChartDataTotalSpent}
                  chartOptions={optionLineChart}
                />
              )}
          </Box>
        </>
      )}
    </>
  );
};

export default YourComponent;
