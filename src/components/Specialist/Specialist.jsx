import React from "react";
import "./Specialist.css";
import plus from "../../assets/img/plus.png";

const Specialist = ({ name, qualification, photo }) => {
  return (
    <div class="container">
      <img src={photo} alt="person img" class="photo" />
      <div>
        <h3 className="name">{name}</h3>
        <p className="qualification">{qualification}</p>
      </div>
      <div class="plus-circle">
        <img src={plus} alt="plus" class="plus" />
      </div>
    </div>
  );
};

export default Specialist;
