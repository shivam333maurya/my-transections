import { Input, Typography } from "antd";
import { useState } from "react";

interface InputProps {
  label: string;
  value?: string;
  onChange?: (value: string, name: string) => void;
  name: string;
  type?: string;
  placeHolder?: string;
  disabled?: boolean;
}

const CustomInput = ({
  label,
  value,
  type = "text",
  onChange,
  name,
  placeHolder,
  disabled,
}: InputProps) => {
  const [fieldValue, setFieldValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target?.value;
    const name = e.target?.name;
    console.log(value);
    setFieldValue(value);
    if (onChange) {
      onChange(value, name);
    }
  };

  return (
    <div>
      <Typography className="text-left ml-1 text-zinc-500">
        {label}
        <span className="text-red-600">*</span>
      </Typography>
      <Input
        placeholder={placeHolder}
        disabled={disabled}
        value={fieldValue}
        onChange={handleChange}
        name={name}
        type={type}
      />
    </div>
  );
};

export default CustomInput;
