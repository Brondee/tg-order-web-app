import React, { useState } from "react";
import "./Date.css";

const Date = ({ date, isWorking, isActive }) => {
  const [isActiveNow, setIsActiveNow] = useState(isActive);
  return (
    <div
      class={`date-container ${isActiveNow && "date-active"}`}
      onClick={() => setIsActiveNow(true)}
    >
      <p class={`date ${isWorking && "date-working"}`}>{date}</p>
    </div>
  );
};

export default Date;
