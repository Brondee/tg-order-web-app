import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useTelegram } from "../../../hooks/useTelegram";
import { setIsEdit } from "../../../store/adminSlice";
import FormInput from "../../ui/FormInput/FormInput";

const CategoryForm = ({ id, titleProp }) => {
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState(false);

  const { isEdit, curEditType } = useSelector((state) => state.admin);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tg, setOnClickButton } = useTelegram();

  tg.MainButton.show();
  tg.MainButton.setText("Подтвердить");

  const onChange = (e) => {
    setTitle(e.target.value);
  };
  const categoryConfirmClick = async () => {
    if (title.length === 0) {
      setTitleError(true);
    } else {
      if (isEdit) {
        const data = {
          id,
          title,
        };
        try {
          const reponse = await axios.patch(
            "http://localhost:3333/category/edit",
            data
          );
          console.log(reponse.data);
          dispatch(setIsEdit(false));
          navigate("/categories");
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const reponse = await axios.post(
            "http://localhost:3333/category/add",
            { title }
          );
          console.log(reponse.data);
          dispatch(setIsEdit(false));
          navigate("/categories");
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  if (curEditType === "categories") {
    setOnClickButton(categoryConfirmClick);
  }

  useEffect(() => {
    if (isEdit) {
      setTitle(titleProp);
    }
  }, [titleProp, isEdit]);

  return (
    <form className="specialist-form">
      <FormInput
        labelTitle="Название"
        inputValue={title}
        onChangeFunc={onChange}
        isError={titleError}
      />
      <div onClick={categoryConfirmClick}>Confirm</div>
    </form>
  );
};

export default CategoryForm;
