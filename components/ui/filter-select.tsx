import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface FilterSelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  disabled?: boolean;
}

const FilterSelect: React.FC<FilterSelectProps> = ({
  value,
  onChange,
  options,
  disabled = false
}) => (
  <select
    value={value}
    onChange={onChange}
    disabled={disabled}
    className="max-w-40 h-10 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    {options.map(({ value, label }) => (
      <option key={value} value={value} className="text-xs md:text-sm">
        {label}
      </option>
    ))}
  </select>
);

export default FilterSelect;
