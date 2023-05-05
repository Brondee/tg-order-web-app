import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import {
  setCurDate,
  setCurDateTime,
  setCurWeekDay,
  setCurTime,
} from "../../../store/orderInfoSlice";
import { setCurTimeArray } from "../../../store/adminSlice";
import "./Date.css";
import { months } from "../../../utils/calendarArrays";

const Date = ({ date, isWorkingProp, fullDate, weekDay }) => {
  const [monthTitle, setMonthTitle] = useState("");
  const [isWorking, setIsWorking] = useState(true);
  const [isWorkingPropState, setIsWorkingPropState] = useState(false);

  const dispatch = useDispatch();
  const { curDate, curSpecialistId } = useSelector((state) => state.orderInfo);

  const onClick = useCallback(async () => {
    dispatch(setCurDate(fullDate));
    dispatch(setCurWeekDay(weekDay));
    dispatch(setCurTime(""));
    dispatch(setCurTimeArray([]));
    if (isWorking && isWorkingPropState) {
      try {
        const response = await axios(
          `http://localhost:3333/dates/${fullDate}/${curSpecialistId}`
        );
        const data = response.data;
        dispatch(setCurDateTime({ ...data }));
      } catch (err) {
        console.log(err);
      }
    } else {
      dispatch(
        setCurDateTime({ morningTime: [], afternoonTime: [], eveningTime: [] })
      );
    }
  }, [
    curSpecialistId,
    dispatch,
    fullDate,
    isWorking,
    isWorkingPropState,
    weekDay,
  ]);

  useEffect(() => {
    setIsWorking(isWorkingProp);
    setIsWorkingPropState(isWorkingProp);
    const getDateInfo = async () => {
      try {
        const response = await axios(
          `http://localhost:3333/dates/single/${fullDate}/${curSpecialistId}`
        );
        const data = response.data;
        if (data.isWorkingDateChanged) {
          setIsWorkingPropState(true);
          setIsWorking(data.isWorkingDate);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getDateInfo();
    let today = new window.Date();
    if (date === today.getDate()) {
      onClick();
    }
    let curMonthTitle = months[Number(fullDate.slice(5, -3)) - 1].slice(0, 3);
    if (curMonthTitle === "мая") {
      curMonthTitle = "май";
    }
    setMonthTitle(curMonthTitle);
  }, [isWorkingProp, date, fullDate, curSpecialistId, onClick]);

  return (
    <div
      className={`date-container ${curDate === fullDate && "date-active"} ${
        isWorking && "date-container-working"
      }`}
      onClick={onClick}
    >
      <p className={`month-title ${isWorking && "month-title-working"}`}>
        {monthTitle}
      </p>
      <p className={`date ${isWorking && "date-working"}`}>{date}</p>
    </div>
  );
};

export default Date;
