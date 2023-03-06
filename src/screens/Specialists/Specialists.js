import React from "react";
import Specialist from "../../components/Specialist/Specialist";

import "../../assets/styles/global.css";
import "./Specialists.css";

import { specialists } from "../../data";

const Specialists = () => {
  return (
    <div class="main-container">
      <div className="wrap">
        <h1 class="main-title">Выберите специалиста</h1>
        <div className="components-container">
          {specialists.map((person) => {
            const { name, qualification, photo } = person;
            return (
              <Specialist
                name={name}
                qualification={qualification}
                photo={photo}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Specialists;
