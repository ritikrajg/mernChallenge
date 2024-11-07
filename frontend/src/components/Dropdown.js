import React from 'react';

const Dropdown = ({ months, selectedMonth, onChange }) => {
  return (
    <select value={selectedMonth} onChange={(e) => onChange(e.target.value)}>
      <option value="">Select Month</option>
      {months.map((month, index) => (
        <option key={index} value={month}>
          {month}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
