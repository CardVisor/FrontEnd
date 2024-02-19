import { IconButton, Box, Select, Flex } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import React, { useEffect, useState, useMemo } from "react";

const allOptions = [];
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth() + 1;
for (let year = currentYear; year >= currentYear - 3; year--) {
    const endMonth = year === currentYear ? currentMonth : 12;
    for (let month = endMonth; month >= 1; month--) {
        const monthString = month < 10 ? `0${month}` : `${month}`;
        const yearString = String(year);
        const optionText = `${yearString}년 ${monthString}월`;
        const optionValue = `${yearString}-${monthString}`;
        allOptions.push({ text: optionText, value: optionValue });
    }
}

function TopMonthFilter({setSelectStartMonth, setSelectEndMonth}) {
    const [startMonth, setStartMonth] = useState(allOptions[11]?.value);
    const [endMonth, setEndMonth] = useState(allOptions[0]?.value);

    const startMonthOptions = allOptions;
    const endMonthOptions = useMemo(() => {
        const endMonthIndex = allOptions.findIndex(
            (option) => option.value === startMonth
        );
        return allOptions.slice(0, endMonthIndex + 1);
    }, [startMonth]);

    const handlerEndMonth = (event) => {
        setStartMonth(event.target.value);
    };

    const handlerStartMonth = (event) => {
        setEndMonth(event.target.value);
    };

    // useEffect(() => {
    //     setSelectStartMonth(startMonth);
    //     setSelectEndMonth(endMonth);
    // }, [endMonth, startMonth]);

    useEffect(() => {
        // 최초 렌더링 시에만 값을 설정
        if (startMonth !== null && endMonth !== null) {
            setSelectStartMonth(startMonth);
            setSelectEndMonth(endMonth);
        }
    }, []);
    return (
        <Box>
            <Flex
                alignItems="center"
                gap="2"
                fontSize="sm"
            >
                조회 기간
                <Box>
                    <Select
                        value={startMonth}
                        onChange={handlerEndMonth}
                        size="sm"
                        borderColor="gray.300"
                        w={140}
                    >
                        {startMonthOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.text}
                            </option>
                        ))}
                    </Select>
                </Box>
                ~
                <Box>
                    <Select
                        value={endMonth}
                        onChange={handlerStartMonth}
                        size="sm"
                        borderColor="gray.300"
                        w={140}
                    >
                        {endMonthOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.text}
                            </option>
                        ))}
                    </Select>
                </Box>
                <IconButton
                    colorScheme="blue"
                    aria-label="Search database"
                    icon={<SearchIcon />}
                    pl={6}
                    pr={6}
                />
            </Flex>
        </Box>
    );
}

export default TopMonthFilter;