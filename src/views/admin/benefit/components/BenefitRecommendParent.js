import { Fragment, useState } from 'react';
import BenefitRecommendResult from './BenefitRecommendResult';

function BenefitRecommendParent({ data }) {
    const [loadingValue, setLoadingValue] = useState(false);


    return (
        <>
            <BenefitRecommendResult data={data} />
        </>
    );
}

export default BenefitRecommendParent;
