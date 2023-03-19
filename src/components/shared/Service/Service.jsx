import React, { useState } from "react";
import "./Service.css";
import { useTelegram } from "../../../hooks/useTelegram";
import CircleBtn from "../../ui/CircleBtn/CircleBtn";

const Service = ({ id, title, price, time }) => {
  const [isActive, setIsActive] = useState(false);
  const { onToggleButton } = useTelegram();

  const onClick = () => {
    onToggleButton();
    setIsActive(!isActive);
  };
  return (
    <div
      class={`container ${isActive && "container-active"}`}
      onClick={onClick}
    >
      <div className="info-container">
        <h3 className="title">{title}</h3>
        <div className="price-time-container">
          <p className="price">{price} ₽</p>
          <p className="time">{time}</p>
        </div>
      </div>
      <CircleBtn isActive={isActive} />
    </div>
  );
};

export default Service;
