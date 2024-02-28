// Chakra imports
import { Box, Flex } from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card.js';
import axios from 'axios';

// Assets
import React, { useState, useEffect } from 'react';
import PieChartComponent from 'views/admin/dataTables/components/CardMccChart';
import PieChartComponent2 from 'views/admin/dataTables/components/CardMccTest';
import { cardState } from '../../views/admin/Recoil/CardCluster';
import { useSetRecoilState } from 'recoil';
export default function NFT(props) {
    const API_SERVER = process.env.REACT_APP_API_SERVER;
    const { cardId, cardType, month } = props;
    const [mccChartDataList, setMccChartDataList] = useState([]);
    const Setstate = useSetRecoilState(cardState);
    useEffect(() => {
        // Setstate(true);
        axios
            .get(`${API_SERVER}/CardCluster/MccCharts?month=${month}&type=${cardType}`)
            .then((response) => {
                const data = response.data.map((item) => ({
                    value: item.total,
                    category: item.ctg_name,
                }));
                setMccChartDataList(data);
                //console.log(data);
                // Setstate(false);
            })
            .catch((error) => {
                console.error('Error fetching data', error);
            });
    }, [cardType, month]);

    return (
        <Card p="10px">
            <Flex direction={{ base: 'column' }} justify="center" align="center" style={{ height: '100%' }}>
                <Box mb={{ base: '1px', '2xl': '1px' }} position="relative" style={{ width: '100%', height: '100%' }}>
                    {/* {mccChartDataList.length > 0 && (
            <PieChartComponent
              chartId={cardId}
              data={mccChartDataList}
              style={{ width: "100%", height: "100%" }}
            />
          )} */}
                    {mccChartDataList.length > 0 && (
                        <PieChartComponent2
                            chartId={cardId}
                            data={mccChartDataList}
                            style={{ width: '100%', height: '100%' }}
                        />
                    )}
                    {/* <PieChartComponent
            chartId={cardId}
            data={mccChartDataList}
            style={{ width: "100%", height: "100%" }}
          /> */}
                </Box>
            </Flex>
        </Card>
    );
}
