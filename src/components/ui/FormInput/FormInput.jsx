import React from "react";
import "./FormInput.css";

const FormInput = ({
  labelTitle,
  inputValue,
  onChangeFunc,
  placeholder,
  isError,
  onKeyDown,
}) => {
  const onKeyDownFunc = (e) => {
    if (onKeyDown) {
      onKeyDown(e);
    }
  };
  return (
    <div>
      <label
        htmlFor={labelTitle}
        className={`form-label ${isError && "form-label-error"}`}
      >
        {labelTitle}
      </label>
      <input
        type="text"
        id={labelTitle}
        value={inputValue}
        placeholder={placeholder}
        onChange={(e) => onChangeFunc(e)}
        onKeyDown={onKeyDownFunc}
        className={`form-input ${isError && "form-input-error"}`}
      />
    </div>
  );
};

export default FormInput;
