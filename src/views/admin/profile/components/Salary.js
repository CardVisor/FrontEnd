// Chakra imports
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

// Custom components
import Card from "components/card/Card.js";
import axios from "axios";

export default function SalaryInformation(props) {
  const { ...rest } = props;
  const chartRef = useRef(null); // 차트에 대한 참조를 생성

  useEffect(() => {
    Promise.all([
      axios.get("/customer/custSalary"),
      axios.get("/customer/amountBySalary")
    ]).then(responses => {
      const responseData1 = responses[0].data;
      const responseData2 = responses[1].data;

      const labels1 = responseData1.map(item => item[0]); // cust_salary
      const dataset1 = responseData1.map(item => item[1]); // 고객 수

      const dataset2 = labels1.map(label => {
        const dataPair = responseData2.find(pair => pair[0] === label);
        return dataPair ? parseFloat(dataPair[1].replace(/,/g, '').replace("₩", '')) : 0;
      });
      // 연봉 순서 배열
      const salaryOrder = ["3000만원 미만", "3000만원 이상 5000만원 미만", "5000만원 이상 7000만원 미만", "7000만원 이상 1억 미만", "1억 이상"];

      responseData1.sort((a, b) => salaryOrder.indexOf(a[0]) - salaryOrder.indexOf(b[0]));
      responseData2.sort((a, b) => salaryOrder.indexOf(a[0]) - salaryOrder.indexOf(b[0]));
      // 연령대 순서에 따라 데이터 정렬
      const sortedLabels = salaryOrder;
      const sortedData1 = sortedLabels.map(salary => {
        const index = labels1.indexOf(salary);
        return index !== -1 ? dataset1[index] : 0;
      });
      const sortedData2 = sortedLabels.map(salary => {
        const index = labels1.indexOf(salary);
        return index !== -1 ? dataset2[index] : 0;
      });
      const data = {
        labels: sortedLabels,
        datasets: [
          {
            label: 'Dataset 1',
            data: sortedData1,
            borderColor: '#FFB1C1',
            backgroundColor: '#FFB1C1',
            stack: 'combined',
            type: 'bar',
            yAxisID: 'y',
          },
          {
            label: 'Dataset 2',
            data: sortedData2,
            borderColor: 'blue',
            backgroundColor: 'blue',
            stack: 'combined',
            type: 'line',
            yAxisID: 'y1',
          }
        ]
      };

      const config = {
        type: 'bar',
        data: data,
        options: {
          scales: {
            y: {
              stacked: true
            },
            y1: {
              position: 'right',
              display: true,
              grid: {
                drawOnChartArea: false,
              },
            },
          },
          plugins: {
            title: {
              display: true,
              text: '연봉별 비율과 평균 소비액'
            }
          },
        },
      };

      if (chartRef.current) { // 차트가 이미 그려져 있다면 그 차트를 파괴
        chartRef.current.destroy();
      }

      const ctx = document.getElementById('salaryChart');
      chartRef.current = new Chart(ctx, config);
    });
  }, []);  // 의존성 배열은 비어있음

  return (
    <Card mb={{ base: "0px", "2xl": "20px" }} {...rest}>
      <canvas id="salaryChart" width="300" height="300"></canvas>
    </Card>
  );
}