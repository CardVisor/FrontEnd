import { Icon } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/system";
import IconBox from "components/icons/IconBox";
import React, { useState } from "react";
import AdminMiniStatistics from "views/admin/default/components/AdminMiniStatistics";
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
} from "react-icons/md";

function Totalpayments(props) {
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  const [totalamount, setTotalAmount] = useState();

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
      name="월 총 결제 금액"
      value="$642.39"
    />
  );
}

export default Totalpayments;
