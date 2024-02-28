import React, { useEffect, useState } from "react";
import IconBox from "components/icons/IconBox";
import { Box, Icon, useColorModeValue } from "@chakra-ui/react";
import InterMiniStatistics from "views/admin/international/components/InterMiniStatistics";
import { FaChartPie } from "react-icons/fa6";
import axios from "axios";
import { chartNationInfo } from "../variables/chartNationInfo";
import { numberWithDots } from "../variables/util";

function TopHighestOrderPayment(props) {
    const brandColor = useColorModeValue("brand.500", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    const [paymentRank, setPaymentRank] = useState(null);

    //const data = ['data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7', 'data8', 'data9', 'data10'];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
        axios({
            method: "get",
            url: "/international/highestOrderPayment",
        })
            .then((res) => {
                //console.log(res.data);
                setPaymentRank(res.data);
                setIsVisible(true);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    
    useEffect(() => {
        if (paymentRank !== null) {
            const timer = setInterval(() => {
                setIsVisible(false);
    
                setTimeout(() => {
                    setCurrentIndex((currentIndex) => (currentIndex + 1) % paymentRank.length);
                    setIsVisible(true);
                }, 500);
            }, 3500);
    
            return () => clearInterval(timer);
        }
    }, [paymentRank]);
    
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
                    as={FaChartPie}
                    color={brandColor}
                  />
                }
              />
            }
            name={paymentRank && `올해 결제 TOP 20`}
            value={
              <Box className={isVisible ? 'fade-in' : 'fade-out'}>
                {paymentRank && (
                  <>
                    <span className="toplist">No.{currentIndex + 1}</span>
                    {chartNationInfo.filter( target => 
                        target.currencyCode === paymentRank[currentIndex].CURRENCY_CODE && target.nationCode === paymentRank[currentIndex].NATION
                    ).map(target => { 
                        if(target.currencyCode === "EUR") return "유럽";
                        return target.kName;
                    })}{" "}
                    {numberWithDots(paymentRank[currentIndex].PAYMENT_CNT)}건
                  </>
                )}
              </Box>
            }
          />
        </>
      );
}

export default TopHighestOrderPayment;
