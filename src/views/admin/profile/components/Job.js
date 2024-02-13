import { useEffect, useState } from "react";
import { PolarArea } from "react-chartjs-2";
import Card from "components/card/Card.js";
import axios from "axios";
import Color from "color";

const CHART_COLORS = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  pink: 'rgb(255, 105, 180)',
  purple: 'rgb(128, 0, 128)',
  brown: 'rgb(165, 42, 42)',
  grey: 'rgb(128, 128, 128)'
};

const transparentize = (color, opacity) => {
  var alpha = opacity === undefined ? 0.5 : 1 - opacity;
  return Color(color).alpha(alpha).rgb().string();
};

export default function JobInformation(props) {
  const { ...rest } = props;
  const [jobTypes, setJobTypes] = useState([]);

  useEffect(() => {
    axios.get('/customer/jobTypes')
      .then(response => {
        const jobTypesData = response.data;
        setJobTypes(jobTypesData);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  const labels = jobTypes.map(jobType => jobType.jobType);
  const data = {
    labels: labels,
    datasets: [
      {
        label: '#',
        data: jobTypes.map(jobType => jobType.count),
        backgroundColor: Object.values(CHART_COLORS).map(color => transparentize(color, 0.5))
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Polar Area Chart'
      }
    }
  };

  return (
    <>
      <Card mb={{ base: "0px", "2xl": "20px" }} {...rest}>
        <PolarArea data={data} options={options} />
      </Card>
    </>
  );
}