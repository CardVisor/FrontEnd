import React, { useEffect, useState } from "react";
import IconBox from "components/icons/IconBox";
import { Icon, useColorModeValue } from "@chakra-ui/react";
import InterMiniStatistics from "views/admin/international/components/InterMiniStatistics";
import { GiMoneyStack } from "react-icons/gi";
import axios from "axios";
import { moneyFormat } from "../variables/util";


function TopTotalPayment(props) {
    const brandColor = useColorModeValue("brand.500", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    const [totalPayment, setTotalPayment]  = useState();

    useEffect(()=>{
        axios({
            method: "get",
            url:"/international/totalPayment",
        }).then((res)=>{
            //console.log("??");
            //console.log(res.data);
            setTotalPayment(res.data)
        }).catch((err)=>{
            console.log(err);
        });
    },[]);

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
                                as={GiMoneyStack}
                                color={brandColor}
                            />
                        }
                    />
                }
                name={totalPayment && '연 해외 총 결제 금액 (2024)'}
                value={totalPayment && `\u{20A9} ${moneyFormat(totalPayment)} 원`}
            />
        </>
    );
}

export default TopTotalPayment;
