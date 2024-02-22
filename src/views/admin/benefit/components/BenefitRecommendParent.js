import { Button } from '@chakra-ui/react';
import { useState } from 'react';
import BenefitRecommendResult from './BenefitRecommendResult';
import Combination from './Combination';

function BenefitRecommendParent({ data }) {
    const handleSecondAction = () => {};
    const [newCombination, setNewCombination] = useState([]);

    return (
        <div>
            <h1>Benefit Recommend 부모</h1>
            <BenefitRecommendResult data={data} setNewCombination={setNewCombination}></BenefitRecommendResult>
            {newCombination && <Combination newCombination={newCombination}></Combination>}
            <Button
                // size="sm"
                maxWidth={180}
                variant="solid"
                colorScheme="facebook"
                mr={3}
                onClick={handleSecondAction}
            >
                2차 조회 버튼
            </Button>
        </div>
    );
}

export default BenefitRecommendParent;
