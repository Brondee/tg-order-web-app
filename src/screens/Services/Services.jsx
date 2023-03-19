import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useTelegram } from "../../hooks/useTelegram";
import Service from "../../components/shared/Service/Service";

import "../../assets/styles/global.css";
import "./Services.css";

const Services = () => {
  const [categories, setCategories] = useState(null);
  const [services, setServices] = useState(null);

  const navigate = useNavigate();

  const { tg } = useTelegram();
  tg.MainButton.onClick(() => navigate("/specialists"));

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

  useEffect(() => {
    getCategories();
    getServices();
  }, []);

  return (
    <div className="main-container">
      <div className="wrap">
        <h1 className="main-title">Выберите услугу</h1>
        <div className="components-container">
          {categories?.map((category) => {
            const { id, title } = category;
            const curServices = services?.filter(
              (service) => service.categoryId === id
            );
            return (
              <div key={id}>
                <h3 className="category">{title}</h3>
                {curServices?.map((service) => {
                  const { id, title, price, time } = service;
                  return (
                    <Service key={id} title={title} price={price} time={time} />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Services;
