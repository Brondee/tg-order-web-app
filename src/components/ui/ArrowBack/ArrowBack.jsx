import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setCurServiceIds } from "../../../store/orderInfoSlice";
import { setIsEdit, setCurCategoryIds } from "../../../store/adminSlice";
import "./ArrowBack.css";
import { ReactComponent as ArrowBackIcon } from "../../../assets/img/arrow.svg";

const ArrowBack = ({ screenTitle }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const colorScheme = window.Telegram.WebApp.colorScheme;

  const { isAdminActions } = useSelector((state) => state.admin);

  const onClick = () => {
    if (screenTitle === "/") {
      dispatch(setCurCategoryIds([]));
      dispatch(setCurServiceIds([]));
    }
    if (isAdminActions) {
      dispatch(setCurCategoryIds([]));
    }
    dispatch(setIsEdit(false));
    navigate(screenTitle);
  };

  return (
    <div
      className={`arrow-back-container ${
        colorScheme === "light" && "arrow-back-container-light"
      }`}
      onClick={onClick}
    >
      <ArrowBackIcon className="arrow-back-img" />
    </div>
  );
};

export default ArrowBack;
