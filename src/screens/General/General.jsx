import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import AnimationPage from "../../components/shared/AnimationPage/AnimationPage";
import FormInput from "../../components/ui/FormInput/FormInput";
import { useTelegram } from "../../hooks/useTelegram";
import ArrowBack from "../../components/ui/ArrowBack/ArrowBack";
import SubmitBtn from "../../components/shared/SubmitBtn/SubmitBtn";
import "./General.css";

const General = () => {
  const [telephone, setTelephone] = useState("");
  const [address, setAddress] = useState("");
  const [telephoneError, setTelephoneError] = useState(false);
  const [addressError, setAddressError] = useState(false);

  const { colorScheme } = useTelegram();
  const navigate = useNavigate();

  const onChangeTelephone = (e) => {
    setTelephone(e.target.value);
  };
  const onChangeAdress = (e) => {
    setAddress(e.target.value);
  };

  const confirmClick = async () => {
    if (telephone.length === 0 && address.length === 0) {
      setTelephoneError(true);
      setAddressError(true);
    } else if (telephone.length === 0) {
      setAddressError(false);
      setTelephoneError(true);
    } else if (address.length === 0) {
      setTelephoneError(false);
      setAddressError(true);
    } else {
      const data = {
        companyTelephone: telephone,
        companyAddress: address,
      };
      try {
        await axios.patch("http://localhost:3333/general/edit", data);
        navigate("/admin");
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    const getGeneralInfo = async () => {
      try {
        const response = await axios.get("http://localhost:3333/general/info");
        const { companyAddress, companyTelephone } = response.data;
        setTelephone(companyTelephone);
        setAddress(companyAddress);
      } catch (err) {
        console.log(err);
      }
    };
    getGeneralInfo();
  }, []);

  return (
    <AnimationPage>
      <div className="main-container">
        <div className="wrap">
          <div className="arrow-title-container">
            <ArrowBack screenTitle={"/admin"} />
            <h1
              className={`main-title ${
                colorScheme === "light" && "main-title-light"
              }`}
            >
              Выберите раздел
            </h1>
          </div>
          <form>
            <FormInput
              labelTitle="Телефон салона"
              inputValue={telephone}
              onChangeFunc={onChangeTelephone}
              placeholder="введите номер телефона"
              isError={telephoneError}
            />
            <FormInput
              labelTitle="Адрес салона"
              inputValue={address}
              onChangeFunc={onChangeAdress}
              placeholder="введите адрес салона"
              isError={addressError}
            />
            <SubmitBtn onClick={confirmClick} />
          </form>
        </div>
      </div>
    </AnimationPage>
  );
};

export default General;