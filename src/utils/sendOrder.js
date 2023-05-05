import axios from "axios";

import { days, months } from "./calendarArrays";

export const sendOrder = (
  name,
  telephone,
  comment,
  masterName,
  curSpecialistId,
  curTime,
  curDate,
  curWeekDay,
  curServiceIds,
  morningTime,
  afternoonTime,
  eveningTime
) => {
  let services = [];
  let servicesInfo = "";
  let totalPrice = 0;
  const getServiceInfo = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3333/services/${curServiceIds}`
      );
      services = response.data;
    } catch (error) {
      console.log(error.response);
    }
    services.map((service, index) => {
      const { title, price } = service;
      totalPrice += price;
      if (services.length - 1 === index) {
        servicesInfo += title;
      } else {
        servicesInfo += title + ", ";
      }
      return service;
    });
  };

  const sendOrderToDb = async () => {
    await getServiceInfo();
    const orderData = {
      clientName: name,
      clientTelephone: telephone,
      clientComment: comment,
      masterName,
      dateTime: `${curDate}, ${curTime}`,
      servicesInfo,
      totalPrice: totalPrice,
      servicesCount: services.length,
    };
    try {
      const response = await axios.post(
        `http://localhost:3333/order/add`,
        orderData
      );
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  sendOrderToDb();

  const sendClientInfoToDb = async () => {
    const clientData = {
      name,
      telephoneNumber: telephone,
    };
    try {
      const response = await axios.post(
        `http://localhost:3333/client/add`,
        clientData
      );
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  sendClientInfoToDb();

  const updateTimeDb = async () => {
    const newMorningTime = morningTime.filter((time) => time !== curTime);
    const newAfternoonTime = afternoonTime.filter((time) => time !== curTime);
    const newEveningTime = eveningTime.filter((time) => time !== curTime);
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
    } catch (error) {
      console.log(error);
    }
  };
  updateTimeDb();

  let message = `Ваша заявка принята!\n\n
    Дополнительного подтверджения по телефону не требуется!\n
    Мы ожидаем Вас:\n
    Дата и время: ${curDate.slice(-2)} ${
    months[Number(curDate.slice(5, -3)) - 1]
  }, 
    ${days[curWeekDay]} в ${curTime}\n
    Мастер: ${masterName}\n
    Услуга(и): ${servicesInfo}\n
    Адрес: Ул.Красная 2/2, г.Краснодар\n\n
    Вы будете уведомлены о записи предварительно за 24 часа и за 2 часа до визита!`;
  console.log(message);
};
