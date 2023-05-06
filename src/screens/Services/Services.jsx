import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import AddBtn from "../../components/ui/AddBtn/AddBtn";
import { useTelegram } from "../../hooks/useTelegram";
import Service from "../../components/shared/Service/Service";
import ArrowBack from "../../components/ui/ArrowBack/ArrowBack";

import "../../assets/styles/global.css";
import "./Services.css";
import AnimationPage from "../../components/shared/AnimationPage/AnimationPage";

const Services = () => {
  const [categories, setCategories] = useState(null);
  const [services, setServices] = useState(null);

  const { isAdminActions } = useSelector((state) => state.admin);

  const navigate = useNavigate();
  const colorScheme = window.Telegram.WebApp.colorScheme;

  const { tg } = useTelegram();
  tg.MainButton.onClick(() => {
    navigate("/specialists");
    tg.MainButton.hide();
  });

  const getServices = async () => {
    try {
      const response = await axios.get(`http://localhost:3333/services/all`);
      const data = response.data;
      const activeServices = data?.filter(
        (service) => service.isActive !== false
      );
      setServices(activeServices);
    } catch (error) {
      console.log(error.response);
    }
  };
  const getCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3333/category/all");
      const data = response.data;
      setCategories(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const moveNext = () => {
    navigate("/specialists");
  };

  useEffect(() => {
    getCategories();
    getServices();
  }, []);

  return (
    <AnimationPage>
      <div className="main-container">
        <div className="wrap">
          <div className="arrow-title-container">
            {isAdminActions && <ArrowBack screenTitle="/admin" />}
            <h1
              className={`main-title ${
                colorScheme === "light" && "main-title-light"
              }`}
            >
              Выберите услугу
            </h1>
          </div>
          <div className="components-container">
            {isAdminActions && <AddBtn screenTitle={"/add"} />}
            {categories?.map((category) => {
              const { id, title } = category;
              const curServices = services?.filter(
                (service) => service.categoryId === id
              );
              return (
                <div key={id}>
                  <h3
                    className={`category ${
                      colorScheme === "light" && "category-light"
                    }`}
                  >
                    {curServices?.length !== 0 && title}
                  </h3>
                  {curServices?.map((service) => {
                    const { id, title, price, time, categoryId } = service;
                    return (
                      <Service
                        key={id}
                        id={id}
                        title={title}
                        price={price}
                        time={time}
                        categoryId={categoryId}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
          <div className="move" onClick={moveNext}>
            <p>Continue</p>
          </div>
        </div>
      </div>
    </AnimationPage>
  );
};

export default Services;
