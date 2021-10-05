import React, { useContext, useEffect, useState } from "react";
import s from "./Cart.module.scss";
import { observer } from "mobx-react-lite";
import { inject } from "mobx-react";
import { CartStore, cartStoreContext } from "../../scripts/mobx/cartStore";
import CartPositions from "./CartPositions";
// @ts-ignore
import {A} from "hookrouter";
import { Close } from '@material-ui/icons';
interface IProps {
  cartStore?: CartStore;
}

const CartModal = inject("cartStore")(
  observer((props: IProps) => {
    const cartStore = useContext(cartStoreContext);
    let [fullyOpen, setFullyOpen] = useState(false);

    const onClickHandler = () => {
      setFullyOpen(false);
      cartStore.openCloseCart();
    };

    const onClickDelButton = (id: string) => {
      cartStore.deletePosition(id);
    };

    useEffect(() => {
      if (cartStore.isOpenCart) {
        setTimeout(() => {
          setFullyOpen(true);
        }, 600);
      }
    }, [cartStore.isOpenCart]);
    return (
      <>
        {props.cartStore?.isOpenCart && (
          <div className={s.CartModalWrapper}>
            <div className={s.CartModal}>
              {fullyOpen && (
                <div>
                  <div className={s.header}>
                    Корзина
                    <div className={s.closeBtn} onClick={onClickHandler}><Close/></div>
                  </div>
                  <div className={s.content}>
                    {!cartStore.positions.length && "Здесь пусто"}
                    {!!cartStore.positions.length && (
                      <CartPositions
                        positions={cartStore.positions}
                        onClickDelButton={onClickDelButton}
                      />
                    )}
                  </div>

                  {!!cartStore.positions.length && (
                    <div className={s.footer}>
                      <div className={s.sum}>
                        Итого: <span>{props.cartStore._sum} грн</span>{" "}
                      </div>
                      <A href={'/order'} onClick={onClickHandler} className={s.makeDealLink}> <div className={s.makeDeal}> Оформить заказ</div></A>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </>
    );
  })
);

export default CartModal;
