import React, { useCallback, useContext, useEffect, useState } from "react";
import s from "./Item.module.scss";
import { IProduct, ProductsStore } from "../../../scripts/mobx/productsStore";
import { inject } from "mobx-react";
import { observer } from "mobx-react-lite";
import { A } from "hookrouter";
import Tab from "../Tab/Tab";
import { CartStore, cartStoreContext } from "../../../scripts/mobx/cartStore";
interface IProps {
  id: string;
  productsStore: ProductsStore;
  cartStore?: CartStore;
}

const Item = inject(
  "productsStore",
  "cartStore"
)(
  observer((props: IProps) => {
    const productsStore = props.productsStore;
    const cartStore = useContext(cartStoreContext);
    const [includesInCart, setIncludesInCart] = useState(
      cartStore._includes(productsStore.currentItem.id)
    );

    if (Object.keys(productsStore.allProducts).length === 0) {
      productsStore.setProducts();
    }

    const buyButtonHandler = useCallback(
      (prod: IProduct) => {
        if (includesInCart) {
          cartStore.openCloseCart();
        } else {
          setIncludesInCart(true);
          cartStore.addPosition(prod);
        }
      },
      [includesInCart]
    );

    useEffect(() => {
      if (!productsStore.currentItem.id) productsStore.setCurrentItem(props.id);
      if (cartStore._includes(productsStore.currentItem.id) !== includesInCart)
        setIncludesInCart(!includesInCart);
      return () => props.productsStore.dropCurrentItem();
    }, [productsStore.currentItem, cartStore.positions.length, includesInCart]);

    return (
      <div className={s.Item}>
        <A className={s.backLink} draggable={false} href={`/categories`}>
          {"< Изделия"}
        </A>

        {productsStore.currentItem.id && (
          <div className={s.block}>
            <div className={s.block_head}>
              <div className={s.code}>
                <span>Код:</span> {productsStore.currentItem.id}
              </div>
            </div>
            <div className={s.block_body}>
              <Tab
                buyButtonHandler={buyButtonHandler}
                currentItem={productsStore.currentItem}
                inCart={includesInCart}
              />
            </div>
          </div>
        )}
      </div>
    );
  })
);

export default Item;
