import { useField } from "formik";
import React from "react";

interface InputProps {
  id: string;
  className?: string;
  name: string;
  label: string;
  brClass?: boolean;
  [x: string]: any;
}

const Input: React.FC<InputProps> = ({
  id,
  className,
  name,
  label,
  brClass,
  placeholder,
  ...props
}) => {
  const [field, meta] = useField(name);
  const { onBlur, onChange, value } = field;
  const { error, touched } = meta;

  return (
    <div>
      <div className="flex justify-between flex-col md:flex-row items-start   md:items-center">
        <label htmlFor={id} className="text-white opacity-40">
          {label}
        </label>
        <input
          id={id}
          value={value}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          placeholder={(touched && error) || placeholder}
          {...props}
          className={`bg-blue-800  hover:bg-blue-700 rounded-full placeholder-gray-500 text-white px-4 py-2 ${className} ${
            error && touched
              ? "border-2 border-red-700 placeholder:text-red-700"
              : "border border-gray-500 focus:border-green-600"
          } ${brClass ? "my-2 mx-2" : ""}`}
        />
      </div>
      {brClass && <br className="hidden md:block" />}
      {touched && error && (
        <div className="text-red-700  max-w-80 font-bold text-center flex flex-wrap">{error}</div>
      )}
    </div>
  );
};

export default Input;
