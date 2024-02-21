import React, { useEffect, useState } from "react";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import "assets/css/datePicker.css";

const DatePickerMonthly = ({ disabled, onChange, allPeriodChecked }) => {
  const [value, setValue] = useState(null);

  const handleDateChange = (date) => {
    setValue(date);
    onChange(date);
  };
  useEffect(() => {
    if (allPeriodChecked) {
      setValue(null);
    }
  }, [allPeriodChecked]);
  return (
    <div>
      <DatePicker
        onChange={handleDateChange}
        value={value}
        maxDetail={"year"}
        disabled={disabled}
      />
    </div>
  );
};

export default DatePickerMonthly;
