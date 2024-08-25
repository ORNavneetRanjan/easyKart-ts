import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  label: React.ReactNode;
  className?: string;
  value: string | number;
  error?: string;
  touched?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  id,
  name,
  label,
  className = "",
  value,
  error,
  touched,
  onChange,
  onBlur,
  ...rest
}) => {
  let borderClass = " border-white";
  if (error && touched) {
    borderClass = " border-red-500";
  }

  return (
    <>
      <div
        className={`flex border-solid border-2 w-full rounded-md ${className}${borderClass}`}
      >
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className="grow text-white bg-transparent p-2 placeholder-white outline-none overflow-scroll"
          {...rest}
        />
      </div>
      {touched && error && <p className="text-red-600 mt-0 mb-0">*{error}</p>}
    </>
  );
};

export default Input;
