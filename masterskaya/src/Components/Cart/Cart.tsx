import React, { useContext, useEffect, useState } from "react";
import s from "./Cart.module.scss";
import CartIcon from "./CartIcon";
import { inject } from "mobx-react";
import { observer } from "mobx-react-lite";
import { CartStore, cartStoreContext } from "../../scripts/mobx/cartStore";

interface IProps {
  cartStore?: CartStore;
}

const Cart = inject("cartStore")(
  observer((props: IProps) => {
    const cartStore = useContext(cartStoreContext);

    const onClickHandler = () => {
      cartStore.openCloseCart();
    };

    useEffect(() => {
      if (cartStore.isOpenCart) {
          // document.body.style.width  = "calc(100vw - 17px)";
        document.body.style.position = "fixed";
        document.body.style.top = `-${window.scrollY}px`;
      } else {
          // document.body.style.width  = "100vw";
        document.body.style.position = "";
        document.body.style.top = "";
      }
    }, [cartStore.isOpenCart]);
    return (
      <div className={s.Cart}>
        <div className={s.buttonWrapper}>
          <div className={s.button} onClick={onClickHandler}>
            {!!cartStore.positions.length && (
              <div className={s.counter}>{cartStore.positions.length}</div>
            )}
            {/*<CartIcon />*/}
          </div>
        </div>
      </div>
    );
  })
);

export default Cart;
