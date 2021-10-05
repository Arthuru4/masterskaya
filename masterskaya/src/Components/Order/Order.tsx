import React, { useCallback, useEffect, useState } from "react";
import s from "./Order.module.scss";
import { inject } from "mobx-react";
import { observer } from "mobx-react-lite";
import cartStore, { CartStore } from "../../scripts/mobx/cartStore";
import { useForm } from "react-hook-form";
import Autocomplete from "react-autocomplete";
import newPostStore, {
  IUserData,
  NewPostStore
} from "../../scripts/mobx/newPostStore";
import { makeOrder } from "../../modules/axiosService";
// import { A } from "hookrouter";
const A = require('hookrouter').A

interface IProps {
  cartStore?: CartStore;
  newPostStore?: NewPostStore;
}

export enum delivery {
  post = "post",
  home = "home"
}
export enum success {
  successMsg = "Заказ произведён успешно, ожидайте звонка на указанный Вами телефон",
  errorMessage = "Сожалеем, произошла ошибка сервиса, повторите заказ позже или свяжитесь с нами через контакты"
}

const Order = inject(
  "cartStore",
  "newPostStore"
)(
  observer((props: IProps) => {
    const { register, handleSubmit, setValue } = useForm();

    const [doneOrder, setDoneOrder] = useState<success | null>(null);
    const clearDoneOrder = () => {
      setDoneOrder(null);
    };
    const onSubmit = useCallback(
      (data: any) => {
        if (!props.newPostStore?.userInfo.mobile) {
        } else {
          makeOrder({userInfo: props.newPostStore?.userInfo, positions: props.cartStore?.positions || []})
            .then(resp => {
              if (resp.data.status === "success") {
                setDoneOrder(success.successMsg);
                props.cartStore?.deletePositions();
              } else {
                setDoneOrder(success.errorMessage);
              }
            })
            .catch(err => {
              setDoneOrder(success.errorMessage);
            });
        }
      },
      [props.newPostStore?.userInfo]
    );
    const setDelivery = (type: delivery) => {
      props.newPostStore?.setData("deliveryType", type);
    };
    useEffect(() => {}, [
      register,
      props.newPostStore?.cities,
      props.newPostStore?.userInfo?.deliveryType,
      props.newPostStore?.userInfo?.deliveryData,
      props.newPostStore?.deliveries,
      // props.newPostStore?.deliveries,
      props.cartStore?.positions.length
    ]);

    const setName = (e: { target: { value: IUserData[keyof IUserData] } }) => {
      props.newPostStore?.setData("name", e.target.value);
    };
    const setDeliveryData = (
      e: { target: { value: IUserData[keyof IUserData] } } | string
    ) => {
      if (typeof e === "string") {
        props.newPostStore?.setData("deliveryData", e);
      } else props.newPostStore?.setData("deliveryData", e.target.value);
      // props.newPostStore?.setData("deliveryData", e.target.value);
    };
    const setPhone = (e: { target: { value: IUserData[keyof IUserData] } }) => {
      props.newPostStore?.setData("mobile", e.target.value);
    };

    const setCity = (
      e: { target: { value: IUserData[keyof IUserData] } } | string
    ) => {
      if (typeof e === "string") {
        props.newPostStore?.setData("city", e);
      } else props.newPostStore?.setData("city", e.target.value);

      props.newPostStore?.updateDataOptions(true);
    };

    const onMenuVisibilityChange = useCallback(
      (isOpen: boolean) => {
        if (isOpen) {
          props.newPostStore?.updateDataOptions();
        }
      },
      [props.newPostStore?.deliveries]
    );

    return (
      <div className={s.Order}>
        {Boolean(!props.cartStore?.positions.length) && !doneOrder && (
          <div>
            <A className={s.backLink} draggable={false} href={`/categories`}>
              {"< Изделия"}
            </A>
            <br />
            <br />В корзине ничего нет
          </div>
        )}
        {!!props.cartStore?.positions.length && !doneOrder && (
          <div>
            Оформление заказа
            <br />
            <br />
            <form action="" onSubmit={handleSubmit(onSubmit)}>
              <div className={s.point}>
                <div className={s.label}>Имя и фамилия</div>
                <div className={s.inputField}>
                  <input
                    ref={register}
                    value={props.newPostStore?.userInfo.name}
                    name="firstName"
                    placeholder={"Full name"}
                    onChange={setName}
                  />
                </div>
              </div>
              <div className={s.point}>
                <div className={s.label}>Город</div>

                <div className={s.inputField}>
                  <Autocomplete
                    getItemValue={item => item?.main}
                    inputProps={{
                      ref: register,
                      name: "city"
                    }}
                    items={props.newPostStore?.cities || []}
                    renderItem={(item, isHighlighted) => (
                      <div
                        key={item.present}
                        style={{
                          background: isHighlighted ? "lightgray" : "white",
                          paddingLeft: "10px",
                          zIndex: 1002
                        }}
                      >
                        {item?.present}
                      </div>
                    )}
                    value={props.newPostStore?.userInfo.city}
                    onChange={setCity}
                    onSelect={val => setCity(val)}
                  />
                </div>
              </div>
              <br />
              <br />
              <div>
                <div className={s.label}>
                  <input
                    id={"post"}
                    name={"post"}
                    type="radio"
                    ref={register}
                    checked={
                      props.newPostStore?.userInfo?.deliveryType ===
                      delivery.post
                    }
                    onChange={() => setDelivery(delivery.post)}
                  />
                  <label htmlFor="post"> На отделение Новой Почты</label>
                </div>
                <div className={s.label}>
                  <input
                    name={"home"}
                    id={"home"}
                    type="radio"
                    checked={
                      props.newPostStore?.userInfo?.deliveryType ===
                      delivery.home
                    }
                    ref={register}
                    onChange={() => setDelivery(delivery.home)}
                  />
                  <label htmlFor="home">Адресная доставка</label>
                </div>
                <div className={s.point}>
                  <div className={s.label}>
                    {props.newPostStore?.userInfo?.deliveryType ===
                    delivery.post
                      ? "Выберите отделение"
                      : "Введите адрес"}
                  </div>

                  <div className={s.inputField}>
                    {props.newPostStore?.userInfo?.deliveryType ===
                      delivery.post && (
                      <Autocomplete
                        getItemValue={item => item}
                        inputProps={{
                          ref: register,
                          name: "deliverie"
                        }}
                        items={props.newPostStore?.deliveries.options || []}
                        renderItem={(item, isHighlighted) => (
                          <div
                            key={item}
                            style={{
                              background: isHighlighted ? "lightgray" : "white",
                              paddingLeft: "10px",
                              zIndex: 1002
                            }}
                          >
                            {item}
                          </div>
                        )}
                        value={props.newPostStore?.userInfo.deliveryData}
                        onMenuVisibilityChange={onMenuVisibilityChange}
                        onSelect={val => setDeliveryData(val)}
                      />
                    )}

                    {props.newPostStore?.userInfo?.deliveryType ===
                      delivery.home && (
                      <input
                        type="text"
                        value={props.newPostStore?.userInfo.deliveryData}
                        ref={register}
                        onChange={setDeliveryData}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className={s.point}>
                <div className={s.label}>Мобильный телефон *</div>

                <div className={s.inputField}>
                  <input
                    type="tel"
                    placeholder={"Mobile phone"}
                    value={props.newPostStore?.userInfo.mobile}
                    ref={register}
                    name="Phone"
                    onChange={setPhone}
                  />
                </div>
              </div>

              <input
                className={s.submit}
                type="submit"
                value={"Подтвердить"}
                disabled={!props.newPostStore?.userInfo.mobile}
              />
            </form>
          </div>
        )}
        {doneOrder && (
          <div className={s.messagePopup}>
            {doneOrder}

            <div>
              <button onClick={clearDoneOrder}>Ok</button>
            </div>
          </div>
        )}
      </div>
    );
  })
);

export default Order;
