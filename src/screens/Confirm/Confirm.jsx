import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import ArrowBack from "../../components/ui/ArrowBack/ArrowBack";
import { setCurServiceIds } from "../../store/orderInfoSlice";
import { sendOrder } from "../../utils/sendOrder";
import { useTelegram } from "../../hooks/useTelegram";

import "../../assets/styles/global.css";
import "./Confirm.css";
import { ReactComponent as EditIcon } from "../../assets/img/pencil.svg";
import { ReactComponent as DeleteIcon } from "../../assets/img/delete.svg";
import { months, days } from "../../utils/calendarArrays";
import AnimationPage from "../../components/shared/AnimationPage/AnimationPage";

const Confirm = () => {
  const [name, setName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [comment, setComment] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [services, setServices] = useState([]);
  const [nameError, setNameError] = useState(false);
  const [telephoneError, setTelephoneError] = useState(false);
  const [imgPath, setImgPath] = useState("");

  let servicesPrice = 0;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { tg } = useTelegram();
  const colorScheme = window.Telegram.WebApp.colorScheme;

  const {
    curTime,
    curDate,
    curWeekDay,
    curSpecialistId,
    curServiceIds,
    morningTime,
    afternoonTime,
    eveningTime,
  } = useSelector((state) => state.orderInfo);

  const onKeyDownTelephone = (e) => {
    if (telephone.length > 0 && name.length > 0) {
      tg.MainButton.setText("Подтвердить");
      tg.MainButton.show();
    } else {
      tg.MainButton.hide();
    }
    if (e.key !== "Backspace") {
      if (telephone.startsWith("+7")) {
        if (
          telephone.length === 2 ||
          telephone.length === 6 ||
          telephone.length === 10 ||
          telephone.length === 13
        ) {
          setTelephone(telephone + " ");
        }
      }
    }
  };

  const onChangeName = (e) => {
    if (telephone.length > 0 && name.length > 0) {
      tg.MainButton.setText("Подтвердить");
      tg.MainButton.show();
    } else {
      tg.MainButton.hide();
    }
    setName(e.target.value);
  };

  const editSpecialistClick = () => {
    navigate("/specialists");
  };

  const editDateTimeClick = () => {
    navigate("/date");
  };

  const deleteServiceClick = (id) => {
    if (services.length > 1) {
      const newServiceIds = curServiceIds.filter(
        (serviceId) => serviceId !== id
      );
      dispatch(setCurServiceIds(newServiceIds));
      const newServices = services.filter((service) => service.id !== id);
      setServices(newServices);
    }
  };

  const confirmClick = () => {
    if (name !== "" && telephone !== "") {
      sendOrder(
        name,
        telephone,
        comment,
        specialist.name,
        curSpecialistId,
        curTime,
        curDate,
        curWeekDay,
        curServiceIds,
        morningTime,
        afternoonTime,
        eveningTime
      );
      setNameError(false);
      setTelephoneError(false);
      navigate("/");
    } else if (name === "" && telephone === "") {
      setNameError(true);
      setTelephoneError(true);
    } else if (name === "") {
      setTelephoneError(false);
      setNameError(true);
    } else if (telephone === "") {
      setNameError(false);
      setTelephoneError(true);
    }
  };

  useEffect(() => {
    const getSpecialistInfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3333/specialist/${curSpecialistId}`
        );
        setSpecialist(response.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    getSpecialistInfo();
    const getServicesInfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3333/services/${curServiceIds}`
        );
        setServices(response.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    getServicesInfo();
  }, [curServiceIds, curSpecialistId]);
  useEffect(() => {
    const getImage = async () => {
      if (specialist?.photoUrl) {
        try {
          const response = await axios(
            `http://localhost:3333/specialist/img/${specialist.photoUrl}`,
            { responseType: "blob" }
          );
          const data = response.data;
          setImgPath(URL.createObjectURL(data));
        } catch (err) {
          console.log("err");
        }
      }
    };
    getImage();
  }, [specialist]);

  return (
    <AnimationPage>
      <div
        className={`main-container ${
          colorScheme === "light" && "main-container-light"
        }`}
      >
        <div className="wrap">
          <div className="arrow-title-container">
            <ArrowBack screenTitle={"/date"} />
            <h1
              className={`main-title ${
                colorScheme === "light" && "main-title-light"
              }`}
            >
              Ваши данные
            </h1>
          </div>
          <form className="form">
            <label
              htmlFor="name"
              className={`label ${nameError && "label-error"}`}
            >
              Имя*
            </label>
            <input
              type="text"
              id="name"
              placeholder="ваше имя"
              value={name}
              onChange={(e) => onChangeName(e)}
              className={`input ${nameError && "input-error"}`}
            />
            <label
              htmlFor="telephone"
              className={`label ${telephoneError && "label-error"}`}
            >
              Телефон*
            </label>
            <input
              type="text"
              id="telephone"
              placeholder="+7 000 000 00 00"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              onKeyDown={(e) => onKeyDownTelephone(e)}
              className={`input ${telephoneError && "input-error"}`}
              maxLength={16}
            />
            <label htmlFor="comment" className="label">
              Комментарий к записи
            </label>
            <input
              type="text"
              id="comment"
              placeholder="комментарий"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="input"
            />
          </form>
          <h3 className="details-title">Детали заказа</h3>
          <div className="spec-container container-animation">
            <div className="img-name-container">
              <img src={imgPath} alt="person img" className="photo" />
              <div className="name-qual-container">
                <h3 className="name">{specialist.name}</h3>
                <p className="qualification">{specialist.qualification}</p>
              </div>
            </div>
            <EditIcon onClick={editSpecialistClick} />
          </div>
          <div className="spec-container date-time-container container-animation">
            <div className="day-info-container">
              <h4 className="day-title">
                {curDate.slice(-2)} {months[Number(curDate.slice(5, -3)) - 1]},{" "}
                {days[curWeekDay]}
              </h4>
              <p className="detail-time">{curTime}</p>
            </div>
            <EditIcon onClick={editDateTimeClick} />
          </div>
          {services?.map((service, index) => {
            const { id, title, price, time } = service;
            servicesPrice += price;
            return (
              <div
                key={id}
                className={`container container-animation ${
                  services.length > 1 && "container-multiple"
                } ${
                  index === 0 &&
                  services.length > 1 &&
                  "container-service-first"
                } ${
                  index === services.length - 1 &&
                  services.length > 1 &&
                  "container-service-last"
                }`}
                onClick={() => deleteServiceClick(id)}
              >
                <div className="info-container">
                  <h3 className="title">{title}</h3>
                  <div className="price-time-container">
                    <p className="price">{price} ₽</p>
                    <p className="time">{time}</p>
                  </div>
                </div>
                {services.length > 1 && <DeleteIcon />}
              </div>
            );
          })}
          <div className="line"></div>
          <div className="service-counter-container">
            <p className="service-counter">
              {curServiceIds.length} {curServiceIds.length === 1 && "услуга"}{" "}
              {curServiceIds.length > 1 && curServiceIds.length < 5 && "услуги"}
              {curServiceIds.length >= 5 && "услуг"}
            </p>
            <p className="services-price">{servicesPrice} ₽</p>
          </div>
          <button onClick={confirmClick}>Confirm</button>
        </div>
      </div>
    </AnimationPage>
  );
};

export default Confirm;
