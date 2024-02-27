import { Icon } from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/system';
import IconBox from 'components/icons/IconBox';
import React, { useEffect, useState } from 'react';
import AdminMiniStatistics from 'views/admin/default/components/AdminMiniStatistics';
import { MdAddTask, MdAttachMoney, MdBarChart, MdFileCopy } from 'react-icons/md';
import axios from 'axios';
function KrwTotalAmount(props) {
    const API_SERVER = process.env.REACT_APP_API_SERVER;
    const brandColor = useColorModeValue('brand.500', 'white');
    const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');

    const [totalamount, setTotalAmount] = useState();
    const [lastmonthtotalamount, setLastMonthTotalAmount] = useState();
    useEffect(() => {
        axios({
            method: 'get',
            url: API_SERVER + '/main/totalAmount',
        })
            .then((res) => {
                setTotalAmount(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        axios({
            method: 'get',
            url: API_SERVER + '/main/lastMonthTotalAmount',
        })
            .then((res) => {
                setLastMonthTotalAmount(res.data);
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
                    icon={<Icon w="32px" h="32px" as={MdAttachMoney} color={brandColor} />}
                />
            }
            name="월 총 결제 금액"
            value={totalamount}
            Krwgrowth={lastmonthtotalamount}
        />
    );
}

export default KrwTotalAmount;
