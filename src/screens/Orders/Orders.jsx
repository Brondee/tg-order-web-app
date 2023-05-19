import React, { useEffect, useState } from "react";
import axios from "axios";

import AnimationPage from "../../components/shared/AnimationPage/AnimationPage";
import "./Orders.css";
import { useTelegram } from "../../hooks/useTelegram";
import ArrowBack from "../../components/ui/ArrowBack/ArrowBack";
import Order from "../../components/shared/Order/Order";
import LoadMoreBtn from "../../components/ui/LoadMoreBtn/LoadMoreBtn";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [todayOrders, setTodayOrders] = useState([]);
  const [offset, setOffset] = useState(0);
  const [todayOffset, setTodayOffset] = useState(0);
  const [isLoadMoreShown, setIsLoadMoreShown] = useState(true);
  const [isLoadMoreTodayShown, setIsLoadMoreTodayShown] = useState(true);

  const { colorScheme } = useTelegram();

  const loadMoreClick = () => {
    setOffset(orders.length);
  };
  const loadMoreTodayClick = () => {
    setTodayOffset(todayOrders.length);
  };

  useEffect(() => {
    const getOrdersInfo = async () => {
      try {
        const response = await axios(
          `http://localhost:8080/order/all/${offset}`
        );
        const data = response.data;
        setOrders((prev) => {
          if (JSON.stringify(prev) !== JSON.stringify(data)) {
            return [...prev, ...data];
          } else {
            return [...data];
          }
        });
        if (data.length < 10) {
          setIsLoadMoreShown(false);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getOrdersInfo();
  }, [offset]);

  useEffect(() => {
    const getTodayOrders = async () => {
      try {
        const response = await axios(
          `http://localhost:8080/order/today/${todayOffset}`
        );
        const data = response.data;
        setTodayOrders((prev) => {
          if (JSON.stringify(prev) !== JSON.stringify(data)) {
            return [...prev, ...data];
          } else {
            return [...data];
          }
        });
        if (data.length < 10) {
          setIsLoadMoreTodayShown(false);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getTodayOrders();
  }, [todayOffset]);

  return (
    <AnimationPage>
      <div className="main-container">
        <div className="wrap">
          <div className="arrow-title-container">
            <ArrowBack screenTitle="/admin" />
            <h1
              className={`main-title ${
                colorScheme === "light" && "main-title-light"
              }`}
            >
              Выберите заказ
            </h1>
          </div>
          <h2
            className={`orders-title ${
              colorScheme === "light" && "orders-title-light"
            }`}
          >
            Заказы на сегодня
          </h2>
          {todayOrders.map((order) => {
            return (
              <Order
                key={order.id}
                id={order.id}
                clientName={order.clientName}
                date={order.dateTime}
                totalTime={order.totalTime}
              />
            );
          })}
          <LoadMoreBtn
            isShown={isLoadMoreTodayShown}
            onClick={loadMoreTodayClick}
          />
          <h2
            className={`orders-title ${
              colorScheme === "light" && "orders-title-light"
            }`}
          >
            Остальные
          </h2>
          {orders.map((order) => {
            return (
              <Order
                key={order.id}
                id={order.id}
                clientName={order.clientName}
                date={order.dateTime}
                totalTime={order.totalTime}
              />
            );
          })}
          <LoadMoreBtn isShown={isLoadMoreShown} onClick={loadMoreClick} />
        </div>
      </div>
    </AnimationPage>
  );
};

export default Orders;
