import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "../../../assets/styles/global.css";
import FormInput from "../../ui/FormInput/FormInput";
import CategoriesInput from "../../ui/CategoriesInput/CategoriesInput";
import { ReactComponent as AddIcon } from "../../../assets/img/add.svg";
import { ReactComponent as EditIcon } from "../../../assets/img/pencil.svg";

const SpecialistAddForm = () => {
  const [name, setName] = useState("");
  const [qualification, setQualification] = useState("");
  const [image, setImage] = useState(null);
  const [nameError, setNameError] = useState(false);
  const [qualError, setQualError] = useState(false);

  const { curCategoryIds } = useSelector((state) => state.admin);
  const navigate = useNavigate();

  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangeQual = (e) => {
    setQualification(e.target.value);
  };
  const onChangeUploadImage = (e) => {
    setImage(e.target.files[0]);
  };

  const confirmClick = async () => {
    if (name.length === 0 && qualification.length === 0) {
      setNameError(true);
      setQualError(true);
    }
    if (name.length === 0) {
      setNameError(true);
    } else if (qualification.length === 0) {
      setQualError(true);
    } else {
      try {
        const data = {
          name,
          qualification,
          categoryIds: curCategoryIds,
        };
        const response = await axios.post(
          "http://localhost:3333/specialist/add",
          data
        );
        console.log(response.data);
        navigate("/specialists");
      } catch (err) {
        console.log(err);
      }
      if (image) {
        let formData = new FormData();
        formData.append("file", image);
        try {
          const response = await axios.post(
            `http://localhost:3333/specialist/upload/14`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          navigate("/specialists");
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  return (
    <form className="specialist-form">
      <FormInput
        labelTitle="Имя"
        inputValue={name}
        onChangeFunc={onChangeName}
        isError={nameError}
      />
      <FormInput
        labelTitle="Специальность"
        inputValue={qualification}
        onChangeFunc={onChangeQual}
        isError={qualError}
      />
      <div className="file-input-container">
        <label htmlFor="photoInput" className={`form-label`}>
          Фотография
        </label>
        <input
          type="file"
          id="photoInput"
          onChange={(e) => onChangeUploadImage(e)}
          className={`file-input`}
        />
        <label
          className={`file-btn ${image && "file-btn-chosen"}`}
          htmlFor="photoInput"
        >
          {image ? <EditIcon /> : <AddIcon />}
        </label>
        {image && (
          <p className="file-title">
            Выбрано: <span className="pink-text">{image?.name}</span>
          </p>
        )}
      </div>
      <CategoriesInput />
      <div onClick={confirmClick}>Confirm</div>
    </form>
  );
};

export default SpecialistAddForm;
