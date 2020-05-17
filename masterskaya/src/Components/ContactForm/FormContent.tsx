import React, { useState } from "react";
import { ISubmitData } from "../../modules/axiosService";
import { AxiosPromise } from "axios";
import s from "./Form.module.scss"

interface IProps {
  onSubmitMethod: (msg: ISubmitData) => AxiosPromise;
  formPopupSwitch: (toShowPopup: boolean, isError: boolean) => void;
}

const FormContent = (props: IProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [submitEnabled, setSubmitEnabled] = useState(true);

  const onChangeNameHandler = (event: any): void => {
    setName(event.target.value);
  };

  const onChangeEmailHandler = (event: any): void => {
    setEmail(event.target.value);
  };

  const onChangeMsgHandler = (event: any): void => {
    setMsg(event.target.value);
  };

  const onSubmitHandler = (event: any): void => {
    event.preventDefault();
    if (!submitEnabled) return;
    setSubmitEnabled(false);

    const stateObj: ISubmitData = {
      name,
      email,
      msg
    };
    props
      .onSubmitMethod(stateObj)
      .then(
        e => {
          // ON RESPONSE HERE
          props.formPopupSwitch(true, false);
          setName("");
          setEmail("");
          setMsg("");
        },
        e => {
          props.formPopupSwitch(true, true);

          // ON ERROR HERE
        }
      )
      .finally(() => setSubmitEnabled(true));
  };

  return (
    <div className={s.formContent}>

      <div className={s.formBody}>
        <form className={s.form} onSubmit={onSubmitHandler} method="POST">
          <input
            type="text"
            name="name"
            className={s.formInput}
            placeholder="Name"
            value={name}
            onChange={onChangeNameHandler}
            required={true}
          />
          <input
            type="email"
            name="email"
            className={s.formInput}
            placeholder="E-mail"
            value={email}
            onChange={onChangeEmailHandler}
            required={true}
          />
          <textarea
            name="message"
            className={s.formTextArea}
            placeholder="Message"
            value={msg}
            onChange={onChangeMsgHandler}
          />
          <button type="submit" className={s.submitBtn}>
            {submitEnabled ? "Отправить" : "Отправка..."}
          </button>
        </form>
        <div className={s.formNext}>
          <h3 className={s.formNext_title}>Что дальше</h3>
          <p>
            Здесь Вы можете написать нам письмо с пожеланиями или уточнения к
            заказу. С Вами свяжутся в ближайшее время после отправки формы.
          </p>
          {/*<p>*/}
          {/*  Since we live on two different continents (Australia and Europe) we*/}
          {/*  are available around the clock.*/}
          {/*</p>*/}
        </div>
      </div>
    </div>
  );
};

export default FormContent;
