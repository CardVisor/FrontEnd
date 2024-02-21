import React, { useEffect, useState } from "react";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import "assets/css/datePicker.css";

const DatePickerMonthly = ({ onChange, minDate, defaultValue }) => {
  const [value, setValue] = useState(defaultValue);

  const handleDateChange = (date) => {
    setValue(date);
    onChange(date);
  };

  return (
    <div>
      <DatePicker
        onChange={handleDateChange}
        value={value}
        maxDetail={"year"}
        //disabled={disabled}
        minDate={minDate}
        maxDate={defaultValue}
      />
    </div>
  );
};

export default DatePickerMonthly;
