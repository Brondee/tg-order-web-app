import React, { useState } from "react";
import "./Specialist.css";
import { useTelegram } from "../../hooks/useTelegram";

const Specialist = ({ name, qualification, photo }) => {
  const { onToggleButton } = useTelegram();
  const [isActive, setIsActive] = useState(false);

  const onClick = () => {
    if (!isActive) {
      onToggleButton();
    }
    setIsActive(!isActive);
  };
  return (
    <div
      class={`container ${isActive && "container-active"}`}
      onClick={onClick}
    >
      <div className="img-name-container">
        <img src={photo} alt="person img" class="photo" />
        <div class="name-qual-container">
          <h3 className="name">{name}</h3>
          <p className="qualification">{qualification}</p>
        </div>
      </div>
      <div class={`circle-plus closed ${isActive && "opened"}`}>
        <div class="circle">
          <div class="horizontal"></div>
          <div class="vertical"></div>
        </div>
      </div>
    </div>
  );
};

export default Specialist;
