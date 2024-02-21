// Chakra imports
import { SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
import { useEffect } from "react";
import Chart from "chart.js/auto";

// Custom components
import Card from "components/card/Card.js";
import axios from "axios";

export default function AgeInformation(props) {
  const { ...rest } = props;
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");

  useEffect(() => {
    axios.get("/customer/ageGroup")
      .then(response => {
        const data = response.data;
        // 연령대 순서 배열
        const ageOrder = ["20대", "30대", "40대", "50대", "60대", "70대 이상"];
        // 연령대 순서에 따라 데이터 정렬
        const sortedLabels = ageOrder;
        const sortedData = sortedLabels.map(age => data[age] || 0);
        // Chart rendering logic
        const ctx = document.getElementById('ageChart');
        const myBarChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: sortedLabels,
            datasets: [{
              label: '연령대별 고객 수',
              data: sortedData,
              backgroundColor: [
                '#67B7DC',
                '#6794DC',
                '#6771DC',
                '#8067DC',
                '#A367DC',
                '#C767DC'
              ],
              borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(153, 102, 255, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            indexAxis: 'y', // 'x'로 설정하면 수직 바, 'y'로 설정하면 수평 바
            scales: {
              x: {
                beginAtZero: true
              },
              y: {
                beginAtZero: true
              }
            }
          }
        });
    
        return () => {
          myBarChart.destroy();
        };  
      });
  }, []);

  return (
      <Card mb={{ base: "0px", "2xl": "20px" }} {...rest}>
        <canvas id="ageChart" width="300" height="300"></canvas>
      </Card>
  );
}