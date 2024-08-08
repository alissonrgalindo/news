import React from "react";

interface CheckboxGroupProps {
  label: string;
  items: string[];
  selectedItems: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  label,
  items,
  selectedItems,
  onChange,
}) => (
  <fieldset>
    <legend className="sr-only">{label}</legend>
    {items.map((item) => (
      <div className="pb-1 flex gap-2 items-center" key={item}>
        <input
          type="checkbox"
          id={item}
          value={item}
          checked={selectedItems.includes(item)}
          onChange={onChange}
          aria-labelledby={`${label.toLowerCase()}-label-${item}`}
        />
        <label
          id={`${label.toLowerCase()}-label-${item}`}
          htmlFor={item}
          className="capitalize"
        >
          {item}
        </label>
      </div>
    ))}
  </fieldset>
);

export default CheckboxGroup;
