import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./SpecialistForm.css";
import FormInput from "../../ui/FormInput/FormInput";
import CategoriesInput from "../../ui/CategoriesInput/CategoriesInput";
import { setIsEdit } from "../../../store/adminSlice";
import { ReactComponent as AddIcon } from "../../../assets/img/add.svg";
import { ReactComponent as EditIcon } from "../../../assets/img/pencil.svg";
import { setCurCategoryIds } from "../../../store/adminSlice";

const SpecialistForm = ({
  specialistId,
  nameProp,
  qualificationProp,
  photoUrlProp,
}) => {
  const [name, setName] = useState("");
  const [qualification, setQualification] = useState("");
  const [image, setImage] = useState(null);
  const [nameError, setNameError] = useState(false);
  const [qualError, setQualError] = useState(false);

  const { curCategoryIds } = useSelector((state) => state.admin);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      const data = {
        id: specialistId,
        name,
        photoUrlProp,
        qualification,
        categoryIds: curCategoryIds,
      };
      try {
        const response = await axios.patch(
          "http://localhost:3333/specialist/edit",
          data
        );
        dispatch(setIsEdit(false));
        dispatch(setCurCategoryIds([]));
        navigate("/specialists");
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    setName(nameProp);
    setQualification(qualificationProp);
  }, [nameProp]);

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
      <CategoriesInput specialistId={specialistId} />
      <div onClick={confirmClick}>Confirm</div>
    </form>
  );
};

export default SpecialistForm;
