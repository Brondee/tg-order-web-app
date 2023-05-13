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
import { useTelegram } from "../../../hooks/useTelegram";
import { months } from "../../../utils/calendarArrays";

const Date = ({ date, isWorkingProp, fullDate, weekDay }) => {
  const [monthTitle, setMonthTitle] = useState("");
  const [isWorking, setIsWorking] = useState(true);

  const dispatch = useDispatch();
  const { curDate, curSpecialistId } = useSelector((state) => state.orderInfo);
  const { colorScheme } = useTelegram();

  const onClick = useCallback(async () => {
    dispatch(setCurDate(fullDate));
    dispatch(setCurWeekDay(weekDay));
    dispatch(setCurTime(""));
    dispatch(setCurTimeArray([]));
    if (isWorking) {
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
  }, [curSpecialistId, dispatch, fullDate, isWorking, weekDay]);

  useEffect(() => {
    const getDateInfo = async () => {
      try {
        const response = await axios(
          `http://localhost:3333/dates/single/${fullDate}/${curSpecialistId}`
        );
        const data = response.data;
        if (data.isWorkingDate !== "none") {
          setIsWorking(data.isWorkingDate.toLowerCase() === "true");
        } else {
          setIsWorking(Boolean(isWorkingProp));
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
      } ${colorScheme === "light" && "date-container-light"}`}
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
