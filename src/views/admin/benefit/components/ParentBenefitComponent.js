import React, { useEffect, useState } from "react";
import BenefitPieOfPie from "./BenefitPieOfPie";
import BenefitUsingPieOfPie from "./BenefitUsingPieOfPie";

function ParentBenefitComponent(props) {
  const benefitTopList = props.data;
  const [clickedChartEl, setClickedChartEl] = useState(null);

  const handleChartClick = (data) => {
    // 클릭된 슬라이스의 데이터를 가공
    setClickedChartEl(data);
  };

  return (
    <div>
      <BenefitPieOfPie
        data={benefitTopList}
        val="Card Benefit Top 5"
        id="chart1"
        onSliceClick={handleChartClick}
      />
      <BenefitUsingPieOfPie data={clickedChartEl} />
    </div>
  );
}

export default ParentBenefitComponent;
