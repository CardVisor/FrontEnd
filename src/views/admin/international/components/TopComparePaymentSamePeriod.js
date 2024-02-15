import React, { useEffect, useState } from "react";
import IconBox from "components/icons/IconBox";
import { Icon, useColorModeValue } from "@chakra-ui/react";
import InterMiniStatistics from "views/admin/international/components/InterMiniStatistics";
import { AiOutlineStock } from "react-icons/ai";
import axios from "axios";

function TopComparePaymentSamePeriod(props) {
    const brandColor = useColorModeValue("brand.500", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    const today = new Date();
    const [comparePayment, setComparePayment]  = useState();
    const month = today.getMonth() + 1;  // 월

    const numberWithCommas = (x)=> {
        return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const roundToTwo = (num) => {
        return +(Math.round(num+'e+2')+'e-2');
    };

    const paymentPercentage = (last, now) => {
        //매출액증가율(%) = (당기매출액-전기매출액) ÷ 전기매출액 × 100
        //console.log("????"+ (now - original)/original * 100);
        return roundToTwo((now - last)/last * 100);
    };

    useEffect(()=>{
        console.log("month??",month);
        axios({
            method: "get",
            url:`/international/comparePaymentSamePeriod?month=${month}`,
        }).then((res)=>{
            console.log("comparePaymentSamePeriod??");
            console.log(res.data);
            setComparePayment(res.data)
        }).catch((err)=>{
            console.log(err);
        });
    },[]);

    //console.log("comparePayment.currentSum!!"+comparePayment?.currentSum);
    //console.log("comparePayment.lastSum!!"+comparePayment?.lastSum);
 
return (
    
        <>
            <InterMiniStatistics
                startContent={
                    <IconBox
                        w="56px"
                        h="56px"
                        bg={boxBg}
                        icon={
                            <Icon
                                w="32px"
                                h="32px"
                                as={AiOutlineStock}
                                color={brandColor}
                            />
                        }
                    />
                }
                name={comparePayment && `전년 ${month}월 대비 증감`}
                value={comparePayment && `\u{20A9} ${numberWithCommas(comparePayment.currentSum - comparePayment.lastSum)} 원`}
                comparePercentage={comparePayment && paymentPercentage(comparePayment.lastSum, comparePayment.currentSum)}
            />
        </>
);

}

export default TopComparePaymentSamePeriod;
