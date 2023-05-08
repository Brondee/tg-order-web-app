import React, { useState, useEffect } from "react";
import axios from "axios";

import { useTelegram } from "../../hooks/useTelegram";
import AddBtn from "../../components/ui/AddBtn/AddBtn";
import ArrowBack from "../../components/ui/ArrowBack/ArrowBack";
import Category from "../../components/shared/Category/Category";
import AnimationPage from "../../components/shared/AnimationPage/AnimationPage";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const { colorScheme } = useTelegram();

  const getCategories = async () => {
    try {
      const response = await axios("http://localhost:3333/category/all");
      const data = response.data;
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

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
              Выберите категорию
            </h1>
          </div>
          <div className="components-container">
            <AddBtn screenTitle="/add" />
            {categories.map((category) => {
              const { id, title } = category;
              return (
                <Category
                  key={id}
                  id={id}
                  title={title}
                  isChosen={false}
                  isFromEditPage={true}
                />
              );
            })}
          </div>
        </div>
      </div>
    </AnimationPage>
  );
};

export default Categories;
