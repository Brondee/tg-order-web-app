import React from "react";

import "./SubmitBtn.css";

const SubmitBtn = ({ onClick }) => {
  return (
    <div className="submit-btn-container">
      <div onClick={onClick} className="submit-btn">
        <p className="submit-text">Подтвердить</p>
      </div>
    </div>
  );
};

export default SubmitBtn;
