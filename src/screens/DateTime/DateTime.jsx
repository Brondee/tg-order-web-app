import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../../assets/styles/global.css";
import "./DateTime.css";

import { useTelegram } from "../../hooks/useTelegram";
import { getDateArray } from "../../utils/getDateArray";
import ArrowBack from "../../components/ui/ArrowBack/ArrowBack";
import Date from "../../components/shared/Date/Date";
import Time from "../../components/shared/Time/Time";
import AnimationPage from "../../components/shared/AnimationPage/AnimationPage";
import { ReactComponent as TickIcon } from "../../assets/img/tick.svg";

const DateTime = () => {
  const [isEmptyTime, setIsEmptyTime] = useState(false);
  const [isTickActive, setIsTickActive] = useState(false);
  const [dateArray, setDateArray] = useState([]);
  const [isTickChange, setIsTickChange] = useState(false);

  const { morningTime, afternoonTime, eveningTime, curDate, curSpecialistId } =
    useSelector((state) => state.orderInfo);
  const { isAdminActions, curTimeArray, curBeginDate, curTimeTable } =
    useSelector((state) => state.admin);

  const navigate = useNavigate();
  const { colorScheme, tg } = useTelegram();

  tg.MainButton.onClick(() => {
    confirmClick();
  });

  const tickClick = () => {
    setIsTickActive(!isTickActive);
    setIsTickChange(true);
  };

  const confirmClick = () => {
    if (isTickChange) {
      updateDateDb();
    } else {
      updateTimeDb();
    }
  };

  const updateTimeDb = async () => {
    let newMorningTime = morningTime;
    let newAfternoonTime = afternoonTime;
    let newEveningTime = eveningTime;
    curTimeArray.map((time) => {
      newMorningTime = newMorningTime.filter((curTime) => curTime !== time);
      newAfternoonTime = newAfternoonTime.filter((curTime) => curTime !== time);
      newEveningTime = newEveningTime.filter((curTime) => curTime !== time);
      return time;
    });
    const timeData = {
      date: curDate,
      specialistId: curSpecialistId,
      morningTime: newMorningTime,
      afternoonTime: newAfternoonTime,
      eveningTime: newEveningTime,
    };
    try {
      const response = await axios.patch(
        `http://localhost:3333/dates/editTime`,
        timeData
      );
      console.log(response.data);
      navigate("/admin");
    } catch (error) {
      console.log(error);
    }
  };

  const updateDateDb = async () => {
    try {
      const dto = {
        date: curDate,
        specialistId: curSpecialistId,
        isWorkingDate: isTickActive,
        isWorkingDateChanged: true,
      };
      const response = await axios.patch(
        "http://localhost:3333/dates/editDate",
        dto
      );
      console.log(response.data);
      navigate("/admin");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (
      morningTime.length === 0 &&
      afternoonTime.length === 0 &&
      eveningTime.length === 0
    ) {
      setIsEmptyTime(true);
      setIsTickActive(false);
    } else {
      setIsEmptyTime(false);
      setIsTickActive(true);
    }
    if (isAdminActions) {
      tg.MainButton.show();
    }
  }, [morningTime, afternoonTime, eveningTime, tg.MainButton, isAdminActions]);
  useEffect(() => {
    const dateFuncArray = getDateArray(curBeginDate, curTimeTable);
    setDateArray(dateFuncArray);
  }, [curBeginDate, curTimeTable]);

  return (
    <AnimationPage>
      <div
        className={`main-container ${
          colorScheme === "light" && "main-container-light"
        }`}
      >
        <div className="wrap">
          <div className="arrow-title-container">
            <ArrowBack screenTitle={"/specialists"} />
            <h1
              className={`main-title ${
                colorScheme === "light" && "main-title-light"
              }`}
            >
              Выберите дату и время
            </h1>
          </div>
          <div className="dates-container">
            {dateArray?.map((dateOnly) => {
              const { id, date, isWorking, weekDay, fullDate } = dateOnly;
              return (
                <Date
                  key={id}
                  date={date}
                  fullDate={fullDate}
                  weekDay={weekDay}
                  isWorkingProp={isWorking}
                />
              );
            })}
          </div>
          {isAdminActions && (
            <div className="working-date-container">
              <div className={`tick-container`} onClick={tickClick}>
                <TickIcon
                  className={`tick-img ${isTickActive && "tick-img-active"}`}
                />
              </div>
              <p className="isworking-text">на дату можно записаться</p>
            </div>
          )}
          {isEmptyTime ? (
            <p className="empty-date-text">На данную дату не записаться</p>
          ) : (
            <div>
              <h3 className="time-title">
                {morningTime.length !== 0 && "Утро"}
              </h3>
              <div className="time-container">
                {morningTime?.map((time) => {
                  return <Time key={time} time={time} />;
                })}
              </div>
              <h3 className="time-title">
                {afternoonTime.length !== 0 && "День"}
              </h3>
              <div className="time-container">
                {afternoonTime?.map((time) => {
                  return <Time key={time} time={time} />;
                })}
              </div>
              <h3 className="time-title">
                {eveningTime.length !== 0 && "Вечер"}
              </h3>
              <div className="time-container">
                {eveningTime?.map((time) => {
                  return <Time key={time} time={time} />;
                })}
              </div>
            </div>
          )}
          {isAdminActions && <div onClick={confirmClick}>Confirm</div>}
        </div>
      </div>
    </AnimationPage>
  );
};

export default DateTime;
