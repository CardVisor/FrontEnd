import React from "react";

const FilterComponent = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const monthOptions = [];
  for (let year = currentYear; year >= currentYear - 2; year--) {
    const startMonth = year === currentYear ? currentMonth : 12;
    const endMonth = year === currentYear - 2 ? currentMonth + 1 : 1;

    for (let month = startMonth; month >= endMonth; month--) {
      const monthString = month < 10 ? `0${month}` : `${month}`;
      const yearString = String(year).substring(2);
      const optionText = `${yearString}년 ${monthString}월`;
      const optionValue = `${yearString}-${monthString}`;
      monthOptions.push({ text: optionText, value: optionValue });
    }
  }

  return (
    <div>
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
