import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setIsEdit } from "../../../store/adminSlice";
import FormInput from "../../ui/FormInput/FormInput";
import SubmitBtn from "../SubmitBtn/SubmitBtn";

const CategoryForm = ({ id, titleProp }) => {
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState(false);

  const { isEdit } = useSelector((state) => state.admin);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
            "http://45.9.43.152:8080/category/edit",
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
            "http://45.9.43.152:8080/category/add",
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
      <SubmitBtn onClick={categoryConfirmClick} />
    </form>
  );
};

export default CategoryForm;
