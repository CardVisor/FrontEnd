import { styled } from "styled-components";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const Main = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
`;

// 식비
// 생활
// 교통/자동차
// 쇼핑
// 미용
// 의료/건강/피트니스
// 여행/숙박
// 오락
// 교육
// 카페/간식
// 주거/통신
// 편의점/마트/잡화
// 취미/여가
// 술/유흥
// 보험/세금/기타금융
// 기타

export default function AssetDoughnutChart() {
  const Data = {
    labels: [
      "식비",
      "생활",
      "교통/자동차",
      "쇼핑",
      "미용",
      "의료/건강/피트니스",
      "여행",
      "오락",
      "교육",
      "카페",
      "주거/통신",
      "편의점/마트/잡화",
      "취미",
      "유흥",
      "보험/세금/기타금융",
      "기타",
    ],
    datasets: [
      {
        data: [40, 20, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        backgroundColor: ["#ffeb9b", "#b5f2ff", "#c5f2ba", "CE4316"],
        borderColor: ["#ffeb9b", "#b5f2ff", "#c5f2ba", "CE4316"],
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
