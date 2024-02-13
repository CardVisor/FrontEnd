import axios from "axios";
import { useEffect, useState } from "react";
import AdminMonthTotalSpent from "./AdminMonthTotalSpent";

const Test = () => {
    const [data, setData] = useState([]);
    const [lastmonthdata, setLastMonthData] = useState([]);
    const [month, setMonth] = useState([]);
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
      const lineChartDataTotalSpent2 = [
        
        {
          name: "올해",
          data: data,
        },
        {
          name: "작년",
          data: lastmonthdata,
        },
      ];
      const lineChartOptionsTotalSpent2 = {
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
    // Other component logic
  
    return (
      <>
      <AdminMonthTotalSpent lineChartDataTotalSpent2={lineChartDataTotalSpent2}
      lineChartOptionsTotalSpent2={lineChartOptionsTotalSpent2}></AdminMonthTotalSpent>
      </>
    );
  };
  
  export default Test;