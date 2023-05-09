import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { useTelegram } from "../../../hooks/useTelegram";
import "./ServiceEditForm.css";
import FormInput from "../../ui/FormInput/FormInput";
import CategoriesInput from "../../ui/CategoriesInput/CategoriesInput";
import { setCurCategoryIds, setIsEdit } from "../../../store/adminSlice";

const ServiceEditForm = ({
  id,
  titleProp,
  priceProp,
  timeProp,
  categoryId,
}) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [time, setTime] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [timeError, setTimeError] = useState(false);

  const { curCategoryIds } = useSelector((state) => state.admin);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { tg } = useTelegram();

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const onChangePrice = (e) => {
    setPrice(e.target.value);
  };
  const onChangeTime = (e) => {
    setTime(e.target.value);
  };
  const onKeyDownTime = (e) => {
    if (e.key !== "Backspace") {
      if (time.length === 2 && time[1] === "ч") {
        setTime(time + " ");
      }
    }
  };

  const confirmClick = useCallback(async () => {
    if (title.length === 0 && price.length === 0 && time.length === 0) {
      setTitleError(true);
      setPriceError(true);
      setTimeError(true);
    } else if (title.length === 0) {
      setTitleError(true);
    } else if (price.length === 0) {
      priceError(true);
    } else if (time.length === 0) {
      setTimeError(true);
    } else {
      try {
        const data = {
          id,
          title,
          price: Number(price),
          time,
          categoryId: curCategoryIds[0],
        };
        await axios.patch("http://localhost:3333/services/edit", data);
        dispatch(setCurCategoryIds([]));
        dispatch(setIsEdit(false));
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  }, [curCategoryIds, dispatch, id, navigate, price, priceError, time, title]);

  useEffect(() => {
    setTitle(titleProp);
    setPrice(priceProp);
    setTime(timeProp);
    tg.MainButton.show();
    tg.MainButton.onClick(() => {
      confirmClick();
    });
  }, [id, priceProp, timeProp, titleProp, tg.MainButton, confirmClick]);

  return (
    <form className="specialist-form">
      <FormInput
        labelTitle="Название"
        inputValue={title}
        onChangeFunc={onChangeTitle}
        isError={titleError}
      />
      <FormInput
        labelTitle="Цена"
        inputValue={price}
        onChangeFunc={onChangePrice}
        isError={priceError}
      />
      <FormInput
        labelTitle="Время выполнения"
        inputValue={time}
        onChangeFunc={onChangeTime}
        isError={timeError}
        placeholder="1ч 30м"
        onKeyDown={onKeyDownTime}
      />
      <CategoriesInput categoryId={categoryId} />
      <div onClick={confirmClick}>Confirm</div>
    </form>
  );
};

export default ServiceEditForm;
