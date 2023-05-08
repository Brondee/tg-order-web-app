import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import { useTelegram } from "../../hooks/useTelegram";

import ArrowBack from "../../components/ui/ArrowBack/ArrowBack";
import Specialist from "../../components/shared/Specialist/Specialist";
import Service from "../../components/shared/Service/Service";
import SpecialistForm from "../../components/shared/SpecialistForm/SpecialistForm";
import ServiceEditForm from "../../components/shared/ServiceEditForm/ServiceEditForm";
import "../../assets/styles/global.css";
import Category from "../../components/shared/Category/Category";
import CategoryForm from "../../components/shared/CategoryForm/CategoryForm";
import AnimationPage from "../../components/shared/AnimationPage/AnimationPage";

const Edit = () => {
  const [specialistInfo, setSpecialistInfo] = useState(null);
  const [serviceInfo, setServiceInfo] = useState([]);
  const [categoryInfo, setCategoryInfo] = useState(null);
  const [arrowScreenTitle, setArrowScreenTitle] = useState(null);

  const { colorScheme } = useTelegram();

  const { curEditType } = useSelector((state) => state.admin);
  const { curSpecialistId, curServiceIds } = useSelector(
    (state) => state.orderInfo
  );
  const { curCategoryIds } = useSelector((state) => state.admin);

  useEffect(() => {
    if (curEditType === "specialists") {
      setArrowScreenTitle("/specialists");
      const getSpecialist = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3333/specialist/${curSpecialistId}`
          );
          const data = response.data;
          setSpecialistInfo(data);
        } catch (err) {
          console.log(err);
        }
      };
      getSpecialist();
    } else if (curEditType === "services") {
      setArrowScreenTitle("/");
      const getServiceInfo = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3333/services/${curServiceIds}`
          );
          const data = response.data;
          setServiceInfo(data);
        } catch (error) {
          console.log(error);
        }
      };
      getServiceInfo();
    } else if (curEditType === "categories") {
      setArrowScreenTitle("/categories");
      const getCategory = async () => {
        try {
          const response = await axios("http://localhost:3333/category/all");
          const data = response.data;
          const curCategoryId = curCategoryIds[0];
          const newData = data.filter(
            (category) => category.id === curCategoryId
          );
          setCategoryInfo(newData[0]);
        } catch (err) {
          console.log(err);
        }
      };
      getCategory();
    }
  }, [curEditType, curCategoryIds, curServiceIds, curSpecialistId]);
  return (
    <AnimationPage>
      <div className="main-container">
        <div className="wrap">
          <div className="arrow-title-container">
            <ArrowBack screenTitle={arrowScreenTitle} />
            <h1
              className={`main-title ${
                colorScheme === "light" && "main-title-light"
              }`}
            >
              Редактирование
            </h1>
          </div>
          {curEditType === "specialists" && (
            <div>
              <Specialist
                id={specialistInfo?.id}
                name={specialistInfo?.name}
                qualification={specialistInfo?.qualification}
                photo={specialistInfo?.photoUrl}
              />
              <SpecialistForm
                specialistId={specialistInfo?.id}
                nameProp={specialistInfo?.name}
                qualificationProp={specialistInfo?.qualification}
                photoUrlProp={specialistInfo?.photoUrl}
                timeTable={specialistInfo?.timeTable}
                beginingDate={specialistInfo?.beginingDate}
              />
            </div>
          )}
          {curEditType === "services" && (
            <div>
              <Service
                id={serviceInfo[0]?.id}
                title={serviceInfo[0]?.title}
                price={serviceInfo[0]?.price}
                time={serviceInfo[0]?.time}
                categoryId={serviceInfo[0]?.categoryId}
              />
              <ServiceEditForm
                id={serviceInfo[0]?.id}
                titleProp={serviceInfo[0]?.title}
                priceProp={serviceInfo[0]?.price}
                timeProp={serviceInfo[0]?.time}
                categoryId={serviceInfo[0]?.categoryId}
              />
            </div>
          )}
          {curEditType === "categories" && (
            <div>
              <Category
                id={categoryInfo?.id}
                title={categoryInfo?.title}
                isChosen={true}
                isFromEditPage={true}
              />
              <CategoryForm
                id={categoryInfo?.id}
                titleProp={categoryInfo?.title}
              />
            </div>
          )}
        </div>
      </div>
    </AnimationPage>
  );
};

export default Edit;
