// Chakra imports
import { Button, ButtonGroup} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import axios from "axios";

// Assets
export default function GenderInformation(props) {
  const { ...rest } = props;
  const [genderData, setGenderData] = useState([]);
  const [monthlyRegistrationsByGender, setMonthlyRegistrationsByGender] = useState([]);
  const [selectedChart, setSelectedChart] = useState('gender');
  const chartRef = useRef(null);

  useEffect(() => {
    axios.get("/customer/genderRatio")
      .then((response) => setGenderData([response.data.남성, response.data.여성]));

    axios.get("/customer/monthlyRegistrationsByGender")
      .then((response) => setMonthlyRegistrationsByGender(response.data)); // Add appropriate handling here
  }, []);

  const renderGenderChart = () => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = document.getElementById("genderChart");
    const config = {
      type: "doughnut",
      data: {
        labels: ["남성", "여성"],
        datasets: [{
          label: "#",
          data: genderData,
          borderWidth: 1,
          backgroundColor: ["#5E3AFF", "#57C3FF"],
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: '성별 비율'
          }
        }
      }
    };
    chartRef.current = new Chart(ctx, config);
  };

  const renderMonthlyRegistrationsByGenderChart = () => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const maleData = monthlyRegistrationsByGender.filter(data => data[0] === "남");
    const femaleData = monthlyRegistrationsByGender.filter(data => data[0] === "여");


    const ctx = document.getElementById("monthlyRegistrationsChart").getContext("2d");
    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: maleData.map(data => `${data[1]}년${data[2]}월`),
        datasets: [{
          label: '남성',
          data: maleData.map(data => data[3]),
          borderColor: 'blue',
          backgroundColor: 'rgba(0, 0, 255, 0.1)',
        }, {
          label: '여성',
          data: femaleData.map(data => data[3]),
          borderColor: 'red',
          backgroundColor: 'rgba(255, 0, 0, 0.1)',
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: '월별 카드 가입자 수'
          }
        }
      },
    });
  };

  useEffect(() => {
    if (genderData.length > 0 && selectedChart === 'gender') {
      renderGenderChart();
    } else if (monthlyRegistrationsByGender.length > 0 && selectedChart === 'monthlyRegistrationsByGender') {
      renderMonthlyRegistrationsByGenderChart();
    }
  }, [genderData, monthlyRegistrationsByGender, selectedChart]);

  return (
    <>
      <Card mb={{ base: "0px", "2xl": "20px" }} {...rest}>
        <ButtonGroup variant="outline" spacing="6" style={{ justifyContent: 'center' }}>
          <Button onClick={() => setSelectedChart('gender')} style={{ fontSize: '14px', width: '100px', height: '35px', borderColor: 'skyblue', borderWidth: '1.5px' }}>성비 차트</Button>
          <Button onClick={() => setSelectedChart('monthlyRegistrationsByGender')} style={{ fontSize: '14px', width: '120px', height: '35px', borderColor: 'skyblue', borderWidth: '1.5px' }}>월별 등록 수 차트</Button>
        </ButtonGroup>
        <div style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', width: selectedChart === 'gender' ? '330px' : '415px' }}>
          {selectedChart === 'gender' ? (
            <canvas id="genderChart" style={{ width: "100%", height: "auto" }}></canvas>
          ) : (
            <canvas id="monthlyRegistrationsChart" style={{ width: "100%", height: "auto" }}></canvas>
          )}
        </div>
      </Card>
    </>
  );
}

