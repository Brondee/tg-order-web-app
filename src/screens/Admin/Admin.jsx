import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsAdminActions, setCurEditType } from "../../store/adminSlice";

import "./Admin.css";
import "../../assets/styles/global.css";
import AnimationPage from "../../components/shared/AnimationPage/AnimationPage";
import { useTelegram } from "../../hooks/useTelegram";

const Admin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { colorScheme } = useTelegram();
  const onClick = (screenTitle, editType) => {
    dispatch(setIsAdminActions(true));
    dispatch(setCurEditType(editType));
    navigate(screenTitle);
  };

  return (
    <AnimationPage>
      <div className="main-container">
        <div className="wrap">
          <div className="arrow-title-container">
            <h1
              className={`main-title ${
                colorScheme === "light" && "main-title-light"
              }`}
            >
              Выберите раздел
            </h1>
          </div>
          <div className="sections-container">
            <div
              className="section section-spec"
              onClick={() => {
                onClick("/specialists", "specialists");
              }}
            >
              <h3 className="section-title">Специалисты</h3>
            </div>
            <div
              className="section section-services"
              onClick={() => {
                onClick("/", "services");
              }}
            >
              <h3 className="section-title">Услуги</h3>
            </div>
            <div
              className="section section-categories"
              onClick={() => {
                onClick("/categories", "categories");
              }}
            >
              <h3 className="section-title">Категории</h3>
            </div>
            <div
              className="section section-time"
              onClick={() => {
                onClick("/specialists", "datetime");
              }}
            >
              <h3 className="section-title">Время</h3>
            </div>
          </div>
        </div>
      </div>
    </AnimationPage>
  );
};

export default Admin;
