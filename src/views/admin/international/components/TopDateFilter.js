import { IconButton, Box, Select, Flex } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";

export const TopMonthFilter = ({ setSelectStartMonth, setSelectEndMonth }) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // getMonth() is zero-based

    const [startMonth, setStartMonth] = useState("");
    const [endMonth, setEndMonth] = useState("");
    const [startMonthOptions, setStartMonthOptions] = useState([]);
    const [endMonthOptions, setEndMonthOptions] = useState([]);

    // create month options
    useEffect(() => {
        const options = [];
        for (let year = currentYear; year >= currentYear - 2; year--) {
            const endMonth = year === currentYear ? currentMonth : 12;

            for (let month = endMonth; month >= 1; month--) {
                const monthString = month < 10 ? `0${month}` : `${month}`;
                const yearString = String(year);
                const optionText = `${yearString}년 ${monthString}월`;
                const optionValue = `${yearString}-${monthString}`;
                options.push({ text: optionText, value: optionValue });
            }
        }
        setEndMonthOptions(options);
        setStartMonthOptions(options);
        setEndMonth(options[0]?.value);
        setStartMonth(options[0]?.value);
    }, [currentMonth]);

    // update endMonthOptions when startMonth is updated
    useEffect(() => {
        const endMonthIndex = startMonthOptions.findIndex(
            (option) => option.value === startMonth
        );
        const newStartMonthOptions = startMonthOptions.slice(
            0,
            endMonthIndex + 1
        );
        setEndMonthOptions(newStartMonthOptions);

        const startMonthIndex = newStartMonthOptions.findIndex(
            (option) => option.value === endMonth
        );
        if (startMonthIndex === -1) {
            setEndMonth(
                newStartMonthOptions[newStartMonthOptions.length - 1]?.value
            );
        }
    }, [startMonth, startMonthOptions]);

    const handlerStartMonth = (event) => {
        setEndMonth(event.target.value);
    };

    const handlerEndMonth = (event) => {
        setStartMonth(event.target.value);
    };

    // update parent component
    useEffect(() => {
        setSelectStartMonth(startMonth);
        setSelectEndMonth(endMonth);
    }, [endMonth, startMonth]);

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
};
