import React, { useState } from "react";
import FormContent from "./FormContent";
import { submitRequest } from "../../modules/axiosService";
import { Popup } from "./Popup/Popup";
import s from "./Form.module.scss";
import insta from "../../assets/instabw.png";
import messanger from "../../assets/messanger.png";
import viber from "../../assets/viberbw.png";

const socArr = [
  {
    img: insta,
    link: "https://www.instagram.com/ludmilats/",
    text: "@ludmilats"
  },
  {
    img: viber,
    link: "viber://chat?number=%2B380662803729",
    text: "+38 066 280 37 29"
  }
];

const Form = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isError, setIsError] = useState(false);

  const formPopupSwitch = (toShowPopup: boolean, isError?: boolean): void => {
    setShowPopup(toShowPopup);
    if (isError !== undefined) setIsError(isError);
  };

  const goToLink = (link: string) => {
    window.open(link);
  };

  const copyToClipBoard = (text: string) => {
    const el = document.createElement("textarea");
    el.value = text;
    document.body.appendChild(el);
    el.select();
    el.setSelectionRange(0, 99999); /*For mobile devices*/

    document.execCommand("copy");
    document.body.removeChild(el);
    alert(`${text} копировано в буфер обмена`)
  };

  const getSocBlock = (data: any) => {
    return (
      <div key={data.text} className={s.socBlock}>
        <div className={s.socIcon}>
          <img
            src={data.img}
            alt="social icon"
            draggable={false}
            onClick={() => {
              goToLink(data.link);
            }}
          />
        </div>
        <div onClick={() => copyToClipBoard(data.text)} className={s.socText}>
          {data.text}
        </div>
      </div>
    );
  };

  const getSocialBlock = () => {
    return (
      <div className={s.social}>{socArr.map(data => getSocBlock(data))}</div>
    );
  };

  return (
    <div className={s.appWrapper}>
      <div className={s.formHeader}>
        <div className={s.formHeader_title}>Свяжитесь с нами</div>
      </div>
      {!showPopup && (
        <div className={s.formWrapper}>
          {getSocialBlock()}

          <FormContent
            onSubmitMethod={submitRequest}
            formPopupSwitch={formPopupSwitch}
          />
        </div>
      )}
      {showPopup && (
        <Popup formPopupSwitch={formPopupSwitch} isError={isError} />
      )}
    </div>
  );
};

export default Form;
