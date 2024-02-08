// Chakra imports
import { SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import axios from "axios";

// Assets
export default function GenderInformation(props) {
  const { ...rest } = props;
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");

  const [genderData, setGenderData] = useState([]);
  const genderChart = useRef(null);

  useEffect(() => {
    axios.get("/customer/genderRatio")
      .then((response) => { console.log(">>>", response.data); setGenderData([response.data.남성, response.data.여성]) });

  }, []);

  const renderDoughnutChart = () => {
    const ctx = document.getElementById("genderChart").getContext("2d");
    if (genderChart.current) {
      genderChart.current.destroy(); // 이전에 그려진 차트 파괴
    }


    genderChart.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["남성", "여성"],
        datasets: [{
          label: "#",
          data: genderData,
          borderWidth: 1,
          backgroundColor: ["#689CFE", "#FEBEBE"],
        }],
      },
    });
  };

  useEffect(() => {
    if (genderData.length > 0) {
      renderDoughnutChart();
    }
  }, [genderData]); // genderData가 변경될 때마다 차트를 다시 렌더링


  return (
    <>
        <Card mb={{ base: "0px", "2xl": "20px" }} {...rest}>
          <canvas id="genderChart" width="300" height="300"></canvas>
        </Card>  
    </>
  );
}

