import {styled} from "styled-components";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js";
import {Doughnut} from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const Main = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export default function AssetDoughnutChart() {
  const Data = {
    labels: ["zz", "xx", "yy", "aa", "bb", "cc" , "dd","ee","ff","gg","hh","ii","jj","kk","nn","mm"],
    datasets: [
      {
        data: [40, 20, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1],
        backgroundColor: ["#ffeb9b", "#b5f2ff", "#c5f2ba","CE4316"],
        borderColor: ["#ffeb9b", "#b5f2ff", "#c5f2ba","CE4316"],
      },
    ],
  };

  const Options = {};

  return (
    <Main>
      <Doughnut data={Data} options={Options}></Doughnut>
    </Main>
  );
}