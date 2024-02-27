import React, { useEffect, useState } from "react";
import axios from "axios";
import { Heading, Stack, StackDivider, Box } from "@chakra-ui/react";
import Card from "components/card/Card.js";
import { useSetRecoilState } from "recoil";

import { cardState } from "views/admin/Recoil/CardCluster";

export default function ShowData(props) {
  const API_SERVER = process.env.REACT_APP_API_SERVER;
  const { card_annual_fee, cardType, month } = props;
  const setcardState = useSetRecoilState(cardState);
  const [cardDetails, setCardDetails] = useState({
    payTotal: null,
    male: null,
    custNum: null,
    majorAge: null,
    female: null,
    benefits: null,
    compTotalPayPercentage: null,
    compCustNum: null,
  });

  useEffect(() => {
    //console.log("들어와 시펄");
    //setcardState(true);
    axios({
      method: "get",
      url:
        API_SERVER + `/CardCluster/CardDetails?type=${cardType}&month=${month}`,
    })
      .then((res) => {
        setCardDetails({
          payTotal: res.data.payTotal,
          male: res.data.남,
          custNum: res.data.custNum,
          majorAge: res.data.majorAge,
          female: res.data.여,
          benefits: res.data.benefits,
          compTotalPayPercentage: res.data.compTotalPayPercentage,
          compCustNum: res.data.compCustNum,
        });

        // console.log(cardDetails);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [cardType, month]);

  return (
    <Card>
      <Stack divider={<StackDivider />} spacing="3" mt="20px">
        <Box>
          <Heading size="xs" textTransform="uppercase">
            총 이용 고객 (전월 대비 증감 : 명) : {cardDetails.custNum} ({" "}
            <span
              style={{
                color:
                  cardDetails.compCustNum > 0
                    ? "green"
                    : cardDetails.compCustNum < 0
                    ? "red"
                    : "black",
              }}
            >
              {cardDetails.compCustNum !== 0 ? cardDetails.compCustNum : "-"}
            </span>{" "}
            )
          </Heading>
        </Box>
        <Box>
          <Heading size="xs" textTransform="uppercase">
            총 결제 금액 (전월 대비 증감 : %) : {cardDetails.payTotal} ({" "}
            <span
              style={{
                color:
                  cardDetails.compTotalPayPercentage >= 0 ? "green" : "red",
              }}
            >
              {cardDetails.compTotalPayPercentage}%
            </span>{" "}
            )
          </Heading>
        </Box>
        <Box>
          <Heading size="xs" textTransform="uppercase">
            주 사용 연령층 : {cardDetails.majorAge}
          </Heading>
        </Box>
        <Box>
          <Heading size="xs" textTransform="uppercase">
            이용 고객 성비 (남/여) : {cardDetails.male} / {cardDetails.female}
          </Heading>
        </Box>
        <Box>
          <Heading size="xs" textTransform="uppercase">
            연회비 : {card_annual_fee} 원
          </Heading>
        </Box>
        <Box>
          <Heading size="xs" textTransform="uppercase">
            혜택 목록 <br />
            {cardDetails.benefits &&
              cardDetails.benefits.map((benefit, index) => (
                <React.Fragment key={index}>
                  <div style={{ paddingLeft: "10px" }}>
                    {index + 1}. {benefit}
                  </div>
                </React.Fragment>
              ))}
          </Heading>
        </Box>
      </Stack>
    </Card>
  );
}
