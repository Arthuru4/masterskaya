import React from "react";
import "./Popups.scss";

interface IProps {
  formPopupSwitch: (toShowPopup: boolean) => void;
  isError: boolean;
}

export const Popup = (props: IProps) => {
  return (
    <div
      className="popup"
      data-gtm-vis-recent-on-screen-6130796_6="50213158"
      data-gtm-vis-first-on-screen-6130796_6="50213158"
      data-gtm-vis-total-visible-time-6130796_6="100"
      data-gtm-vis-has-fired-6130796_6="1"
    >
      {!props.isError && (
        <div>
          {" "}
          <h3>Спасибо за письмо!</h3>
          <p>С Вами свяжутся в ближайшее время, чтобы уточнить детали.</p>
        </div>
      )}
      {props.isError && (
        <div>
          <h3>Ошибка!</h3>
          <p>
            К сожалению, по техническим причинам письмо отправить не удалось.
            Повторите оппытку позже или воспользуйтесь дополнительными
            контактамми для связи с продавцом.
          </p>
        </div>
      )}
      <p>С наилучшими пожеланиями.</p>

      <div className="popupOkBtn" onClick={() => props.formPopupSwitch(false)}>
        OK
      </div>
    </div>
  );
};
