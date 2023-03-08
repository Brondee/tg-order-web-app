import React from "react";

import "../../assets/styles/global.css";
import "./DateTime.css";

import { dates } from "../../data";
import Date from "../../components/Date/Date";

const DateTime = () => {
  return (
    <div class="main-container">
      <div className="wrap">
        <h1 class="main-title">Выберите дату и время</h1>
        <div className="dates-container">
          {dates.map((dateOnly) => {
            const { id, date, isWorking, isActive } = dateOnly;
            return (
              <Date
                key={id}
                date={date}
                isWorking={isWorking}
                isActive={isActive}
              />
            );
          })}
        </div>
        <h3>Утро</h3>
      </div>
    </div>
  );
};

export default DateTime;
