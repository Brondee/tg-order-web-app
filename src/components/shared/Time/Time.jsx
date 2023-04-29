import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { setCurTime } from "../../../store/orderInfoSlice";
import { setCurTimeArray } from "../../../store/adminSlice";

import "./Time.css";

const Time = ({ time }) => {
  const [isActive, setIsActive] = useState(false);
  const {
    curTime,
    curSpecialistId,
    morningTime,
    afternoonTime,
    eveningTime,
    curDate,
  } = useSelector((state) => state.orderInfo);
  const { curEditType, curTimeArray } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onClick = () => {
    if (curEditType === "datetime") {
      if (!isActive) {
        if (curTimeArray.includes(time)) {
          dispatch(setCurTimeArray(curTimeArray));
        } else {
          dispatch(setCurTimeArray([...curTimeArray, time]));
        }
      } else {
        const newTime = curTimeArray.filter((timeData) => timeData !== time);
        dispatch(setCurTimeArray(newTime));
      }
      setIsActive(!isActive);
    } else {
      dispatch(setCurTime(time));
      navigate("/confirm");
    }
  };

  useEffect(() => {
    if (!curTimeArray.includes(time)) {
      setIsActive(false);
    }
  }, [curDate]);

  return (
    <div
      className={`time-handler ${curTime === time && "time-handler-active"} ${
        isActive && "time-handler-active"
      }`}
      onClick={onClick}
    >
      <p className="time-obj">{time}</p>
    </div>
  );
};

export default Time;
