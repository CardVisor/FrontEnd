import axios from 'axios';
import React, { useEffect, useState } from 'react';

import AdminMiniStatistics from 'views/admin/default/components/AdminMiniStatistics';

import IconBox from 'components/icons/IconBox';
import { Icon, useColorModeValue } from '@chakra-ui/react';
import { MdBarChart } from 'react-icons/md';

function CustomerCount(props) {
    const API_SERVER = process.env.REACT_APP_API_SERVER;
    const [custCount, setCustCount] = useState();
    const [addcustCount, setAddCustCount] = useState();
    const brandColor = useColorModeValue('brand.500', 'white');
    const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
    useEffect(() => {
        axios({
            method: 'get',
            url: API_SERVER + '/main/totalCustomer',
        })
            .then((res) => {
                setCustCount(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        axios({
            method: 'get',
            url: API_SERVER + '/main/addOneDayCustomer',
        })
            .then((res) => {
                setAddCustCount(res.data);
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
                    icon={<Icon w="32px" h="32px" as={MdBarChart} color={brandColor} />}
                />
            }
            name="전체 회원수"
            totalperson={custCount}
            growthPeron={addcustCount}
        ></AdminMiniStatistics>
    );
}

export default CustomerCount;
