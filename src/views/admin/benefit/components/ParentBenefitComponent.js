import { useState } from 'react';
import BenefitDetailInfoTable from './BenefitDetailInfoTable';
import BenefitPieOfPie from './BenefitPieOfPie';
import MonthPickingComponent from './MonthPickingComponent';

function ParentBenefitComponent(props) {
    const benefitTopList = props.data;
    const [clickedChartEl, setClickedChartEl] = useState(null);
    const [clickFlag, setClickFlag] = useState(false);

    const handleChartClick = (data) => {
        // 클릭된 슬라이스의 데이터를 가공
        setClickedChartEl(data);
        setClickFlag(true);
    };

    return (
        <div>
            <MonthPickingComponent></MonthPickingComponent>
            <BenefitPieOfPie
                data={benefitTopList}
                val="Card Benefit Top 5"
                id="chart1"
                onSliceClick={handleChartClick}
            />
            <BenefitDetailInfoTable clickedChartEl={clickedChartEl} clickFlag={clickFlag} />
        </div>
    );
}

export default ParentBenefitComponent;
