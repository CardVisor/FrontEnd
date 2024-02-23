import { Fragment, useState } from 'react';
import BenefitRecommendResult from './BenefitRecommendResult';
import Combination from './Combination';

function BenefitRecommendParent({ data }) {
    const [loadingValue, setLoadingValue] = useState(false);

    const [newCombination, setNewCombination] = useState([]);

    return (
        <Fragment>
            <BenefitRecommendResult data={data} setNewCombination={setNewCombination}></BenefitRecommendResult>
            {newCombination && <Combination newCombination={newCombination}></Combination>}
        </Fragment>
    );
}

export default BenefitRecommendParent;
