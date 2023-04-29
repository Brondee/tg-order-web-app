import React from "react";
import "./FormInput.css";

const FormInput = ({ labelTitle, inputValue, onChangeFunc, isError }) => {
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
        onChange={(e) => onChangeFunc(e)}
        className={`form-input ${isError && "form-input-error"}`}
      />
    </div>
  );
};

export default FormInput;
