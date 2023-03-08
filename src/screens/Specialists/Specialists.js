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
            const { id, name, qualification, photo } = person;
            return (
              <Specialist
                key={id}
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
