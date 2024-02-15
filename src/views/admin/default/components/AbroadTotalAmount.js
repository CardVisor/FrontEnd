import { Icon } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/system";
import IconBox from "components/icons/IconBox";
import React, { useEffect, useState } from "react";
import AdminMiniStatistics from "views/admin/default/components/AdminMiniStatistics";
import { MdAttachMoney } from "react-icons/md";
import axios from "axios";
function AbroadTotalAmount(props) {
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  const [aboradtotalamount, setAbroadTotalAmount] = useState();
  const [abroadlastmonthtotalamount, setAbroadLastMonthTotalAmount] =
    useState();
  useEffect(() => {
    axios({
      method: "get",
      url: "/main/abroadTotalAmount",
    })
      .then((res) => {
        console.log("??");
        console.log(res.data);
        setAbroadTotalAmount(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios({
      method: "get",
      url: "/main/abroadLastMonthTotalAmount",
    })
      .then((res) => {
        setAbroadLastMonthTotalAmount(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <AdminMiniStatistics
      startContent={
        <IconBox
          w="56px"
          h="56px"
          bg={boxBg}
          icon={
            <Icon w="32px" h="32px" as={MdAttachMoney} color={brandColor} />
          }
        />
      }
      name="월 총 해외결제 금액"
      abroadvalue={aboradtotalamount}
      growth={abroadlastmonthtotalamount}
    />
  );
}

export default AbroadTotalAmount;
