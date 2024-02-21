import { IconButton, Box, Select, Flex } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import React, { forwardRef, useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import "assets/css/international/datepickerCustom.css";

function formatDate(date) {
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    return `${year}-${month}`;
}
function TopMonthFilter({
    setSelectStartMonth,
    setSelectEndMonth,
    setAnimationRunning,
}) {
    const currentDate = new Date();
    const currentMonth = new Date();
    const lastYear = new Date(
        currentDate.setMonth(currentDate.getMonth() - 11)
    );
    const lastThreeYear = new Date(
        currentDate.setFullYear(currentDate.getFullYear() - 3)
    );

    const [startMonth, setStartMonth] = useState(lastYear);
    const [endMonth, setEndMonth] = useState(currentMonth);

    const handleStartMonthChange = (month) => {
        setStartMonth(month);
    };

    const handleEndMonthChange = (month) => {
        console.log("month", month);
        setEndMonth(month);
    };

    const handleButtonClick = () => {
        console.log("/startMonth??", startMonth);
        console.log("/endMonth??", endMonth);
        setSelectStartMonth(formatDate(startMonth));
        setSelectEndMonth(formatDate(endMonth));
        setAnimationRunning && setAnimationRunning(true);
    };

    useEffect(() => {
        if (startMonth !== null && endMonth !== null) {
            setSelectStartMonth(formatDate(startMonth));
            setSelectEndMonth(formatDate(endMonth));
        }
    }, []);

    //datepickerCustom
    const CustomInput = forwardRef(({ value, onClick }, ref) => (
        <button className="custom-input" onClick={onClick} ref={ref}>
            {value}
        </button>
    ));

    return (
        <Box>
            <Flex alignItems="center" gap="2" fontSize="sm">
                {setAnimationRunning && "조회 기간"}
                <Box>
                    <ReactDatePicker
                        selected={startMonth}
                        onChange={handleStartMonthChange}
                        selectsStart
                        dateFormat="yyyy년 MM월"
                        showMonthYearPicker
                        startDate={startMonth}
                        endDate={endMonth}
                        minDate={lastThreeYear}
                        maxDate={currentMonth}
                        locale={ko}
                        customInput={<CustomInput />}
                    />
                </Box>
                ~
                <Box>
                    <ReactDatePicker
                        selected={endMonth}
                        onChange={handleEndMonthChange}
                        selectsEnd
                        dateFormat="yyyy년 MM월"
                        showMonthYearPicker
                        startDate={startMonth}
                        endDate={endMonth}
                        minDate={startMonth}
                        maxDate={currentMonth}
                        locale={ko}
                        customInput={<CustomInput />}
                    />
                </Box>
                {setAnimationRunning && (
                    <IconButton
                        colorScheme="blue"
                        aria-label="Search database"
                        icon={<SearchIcon />}
                        pl={6}
                        pr={6}
                        onClick={handleButtonClick}
                    />
                )}
            </Flex>
        </Box>
    );
}

export default TopMonthFilter;
