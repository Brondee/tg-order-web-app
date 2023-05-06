import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useTelegram } from "../../../hooks/useTelegram";
import { setCurServiceIds } from "../../../store/orderInfoSlice";
import { setIsEdit, setCurCategoryIds } from "../../../store/adminSlice";
import "./Service.css";
import CircleBtn from "../../ui/CircleBtn/CircleBtn";
import { ReactComponent as DeleteIcon } from "../../../assets/img/delete.svg";

const Service = ({ id, title, price, time, categoryId }) => {
  const [isActive, setIsActive] = useState(false);
  const [isAnimation, setIsAnimation] = useState(false);
  const { tg } = useTelegram();

  const { curServiceIds } = useSelector((state) => state.orderInfo);
  const { curCategoryIds } = useSelector((state) => state.admin);
  const { isAdminActions, isEdit } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClick = async () => {
    if (isEdit) {
      deleteClick();
    } else if (isAdminActions) {
      navigate("/edit");
      dispatch(setCurServiceIds([id]));
      dispatch(setIsEdit(true));
    } else {
      setIsActive(!isActive);
      if (!isActive) {
        dispatch(setCurServiceIds([...curServiceIds, id]));
        dispatch(setCurCategoryIds([...curCategoryIds, categoryId]));
      } else {
        const newCurServiceIds = curServiceIds.filter(
          (dataId) => dataId !== id
        );
        const newCurCategoryIds = curCategoryIds.filter(
          (dataId) => dataId !== categoryId
        );
        dispatch(setCurServiceIds(newCurServiceIds));
        dispatch(setCurCategoryIds(newCurCategoryIds));
      }
      if (curServiceIds.length > 1 || !isActive) {
        console.log(curServiceIds, !isActive);
        console.log("show");
        tg.MainButton.setText("Далее");
        tg.MainButton.show();
      } else if (curServiceIds.length <= 1 || isActive) {
        console.log("hide");
        tg.MainButton.hide();
      }
    }
  };

  const deleteClick = async () => {
    try {
      await axios.delete(`http://localhost:3333/services/del/${id}`);
      dispatch(setIsEdit(false));
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setIsAnimation(true);
  }, []);

  return (
    <div
      className={`container ${isActive && "container-active"} ${
        isEdit && "container-active"
      } ${isAnimation && "container-animation"}`}
      onClick={onClick}
    >
      <div className="info-container">
        <h3 className="title">{title}</h3>
        <div className="price-time-container">
          <p className="price">{price} ₽</p>
          <p className="time">{time}</p>
        </div>
      </div>
      {isEdit ? <DeleteIcon /> : <CircleBtn isActive={isActive} />}
    </div>
  );
};

export default Service;
