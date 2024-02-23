import { Box, Button, Grid, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import NFTBenefit from './NFTBenefit';
import axios from 'axios';
import styled from 'styled-components';


const CardUnitWrap = styled.div`
    width: 50%;
    & .cardUnitBody {
        & .cardUnit {
            border: 1px solid #ddd;
            border-radius: 10px;
            & + .cardUnit {
                margin-top: 15px;
            }
        }
    }

`;

function Combination({ newCombination }) {
    const [combival, setCombival] = useState(0);
    const [curRankVal, SetCurRankVal] = useState(0);
    useEffect(() => {
        console.log('조합배열: Combination에서 호출');
        console.log(newCombination);
        let combiSum = 0;

        newCombination.forEach((data, i) => {
            let curCombiIdx = data.card_benefit_info.length;
            let curCombiSum = 0;
            data.card_benefit_info.forEach((d, i2) => {
                curCombiSum += d.expectedBenefitValue;
            });
            combiSum += curCombiSum / curCombiIdx;
        });

        setCombival(combiSum.toFixed(0));
    }, [newCombination]);

    const handleSecondAction = () => {
        axios({
            url: '/benefitCluster/benefitCombination',
            method: 'post',
            data: { combival: combival },
        })
            .then((res) => {
                console.log(res.data);
                SetCurRankVal(res.data[res.data.length - 1].cur_rank_val);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
        <CardUnitWrap>
            <Box className="subTitle cardTit">Card Recommended</Box>
            <Box className="cardUnitBody">
                {newCombination &&
                    newCombination.map((benefit, index) => (
                        <Box
                            className="cardUnit"
                        >
                            {/* 
                            <Grid
                                key={index}
                                templateColumns={{
                                    base: '1fr',
                                    lg: '2fr 3.5fr',
                                }}
                                templateRows={{
                                    base: 'repeat(1, 5fr)',
                                    lg: '5fr',
                                }}
                                gap={{ base: '50px', xl: '20px' }}
                            > */}
                                <NFTBenefit
                                    data={benefit}
                                    benefit_pct={benefit.benefit_pct}
                                    benefit_detail={benefit.benefit_detail}
                                />
                            
                            {/* </Grid> */}
                        </Box>
                    ))}
                </Box>
        </CardUnitWrap>
            {combival > 0 && (
                <>
                    <div>{'카드 조합에 따른 혜택 가치 합: ' + combival}</div>
                    <Button
                        // size="sm"
                        maxWidth={180}
                        variant="solid"
                        colorScheme="facebook"
                        mr={3}
                        onClick={handleSecondAction}
                    >
                        기존 카드와 가치 평가
                    </Button>
                    {curRankVal !== 0 && <Text>{curRankVal} 위</Text>}
                </>
            )}
        </>
    );
}

export default Combination;
