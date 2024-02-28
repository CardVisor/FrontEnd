import { useState } from 'react';
import BenefitDetailInfoTable from './BenefitDetailInfoTable';
import BenefitPieOfPie from './BenefitPieOfPie';

function ParentBenefitComponent({ benefitList, benefitTitle, date, selectOption }) {
    const [clickedChartEl, setClickedChartEl] = useState(null);
    const [clickFlag, setClickFlag] = useState(false);

    const handleChartClick = (data) => {
        // 클릭된 슬라이스의 데이터를 가공
        setClickedChartEl(data);
        setClickFlag(true);
    };

    return (
        <div>
            <BenefitPieOfPie data={benefitList} val={`${benefitTitle}`} id="chart1" onSliceClick={handleChartClick} />
            <BenefitDetailInfoTable
                clickedChartEl={clickedChartEl}
                clickFlag={clickFlag}
                date={date}
                data={benefitList}
                selectOption={selectOption}
            />
        </div>
    );
}

export default ParentBenefitComponent;
