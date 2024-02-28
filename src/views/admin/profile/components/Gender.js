// Custom components
import Card from "components/card/Card.js";
import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import axios from "axios";

// Assets
export default function GenderInformation(props) {
  const { ...rest } = props;
  const [genderData, setGenderData] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    axios.get("/customer/genderRatio")
      .then((response) => setGenderData([response.data.남성, response.data.여성]));
  }, []);

  const renderGenderChart = () => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = document.getElementById("genderChart");
    if (ctx !== null) {
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
    } else {
      console.error("차트를 찾지 못했습니다.");
    }
  };

  useEffect(() => {
    if (genderData.length > 0) {
      renderGenderChart();
    }
  }, [genderData]);

  return (
    <>
      <Card mb={{ base: "0px", "2xl": "20px" }} {...rest}>
        <div style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '330px' }}>
          <canvas id="genderChart" style={{ width: "100%", height: "auto" }}></canvas>
        </div>
      </Card>
    </>
  );
}
