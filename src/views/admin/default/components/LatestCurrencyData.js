import { Avatar, Flex, FormLabel, Select } from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import AdminMiniStatistics from "views/admin/default/components/AdminMiniStatistics";

import axios from "axios";

function LatestCurrencyData(props) {
  const [currencydata, setCurrencyData] = useState();
  const [price, setPrice] = useState();
  const [flag, setFlag] = useState();
  const [nation, setNation] = useState();
  const [selectedIndex, setSelectedIndex] = useState(0); // Initialize index to 0

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedIndex((prevIndex) => (prevIndex + 1) % currencydata.length); // Increment index, loop back to 0 if end is reached
    }, 3000); // Change currency every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [currencydata]); // Run effect whenever currencyData changes

  useEffect(() => {
    // Set price, flag, and nation based on selected index
    if (currencydata && currencydata.length > 0) {
      const selectedCurrency = currencydata[selectedIndex];
      setPrice(selectedCurrency.currencyRate);
      setFlag(selectedCurrency.currencyFlagUrl);
      setNation(selectedCurrency.currencyNation);
    }
  }, [selectedIndex, currencydata]); // Run effect whenever selectedIndex or currencyData changes

  useEffect(() => {
    axios({
      method: "get",
      url: "/main/latestCurrencyinfo",
    })
      .then((res) => {
        setCurrencyData(res.data);
        const usaCurrency = res.data.find(
          (currency) => currency.currencyCode === "USD"
        );
        if (usaCurrency) {
          // Set default values based on "USA" currency object
          setPrice(usaCurrency.currencyRate);
          setFlag(usaCurrency.currencyFlagUrl);
          setNation(usaCurrency.currencyNation);
        }
      })
      .catch((err) => {
        console.log("Error fetching currency data:", err);
      });
  }, []);
  return (
    <AdminMiniStatistics
      endContent={
        <Flex me="-16px" mt="10px">
          <FormLabel htmlFor="balance">
            <Avatar src={flag} />
          </FormLabel>
          <Select
            id="balance"
            variant="mini"
            mt="5px"
            me="0px"
            defaultValue="usd"
            onChange={(e) => {
              const selectedCurrencyCode = e.target.value;
              const selectedCurrency = currencydata.find(
                (currency) => currency.currencyCode === selectedCurrencyCode
              );
              if (selectedCurrency) {
                // 선택한 화폐에 해당하는 환율 값을 설정합니다.
                setPrice(selectedCurrency.currencyRate);
                setFlag(selectedCurrency.currencyFlagUrl);
                setNation(selectedCurrency.currencyNation);
              }
            }}
          >
            {currencydata &&
              currencydata.map((currency, index) => (
                <option
                  style={{ fontSize: "16px" }}
                  value={currency.currencyCode}
                  key={index}
                >
                  {currency.currencyCode}
                </option>
              ))}
          </Select>
        </Flex>
      }
      name={nation + " 환율"}
      value={price + " 원"}
    />
  );
}

export default LatestCurrencyData;
