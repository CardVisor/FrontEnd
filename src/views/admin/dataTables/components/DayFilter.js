import React from "react";

const FilterComponent = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const yearOptions = [];
  for (let i = 0; i < 3; i++) {
    const year = currentYear - i;
    yearOptions.push(year);
  }

  const monthOptions = [];
  for (let year = currentYear; year <= currentYear + 2; year++) {
    const startMonth = year === currentYear ? 1 : 0;
    const endMonth = year === currentYear + 2 ? currentMonth - 1 : 12;

    for (let month = startMonth; month <= endMonth; month++) {
      const monthString = month < 10 ? `0${month}` : `${month}`;
      const yearString = String(year).substring(2);
      const optionText = `${yearString}년 ${monthString}월`;
      const optionValue = `${yearString}-${monthString}`;
      monthOptions.push({ text: optionText, value: optionValue });
    }
  }

  return (
    <div>
      <label htmlFor="year">연도 선택:</label>
      <select id="year">
        {yearOptions.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      <label htmlFor="month">월 선택:</label>
      <select id="month">
        {monthOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterComponent;
