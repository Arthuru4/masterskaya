import React from "react";
import s from "./Cart.module.scss";
import { IExtra } from "../../scripts/mobx/cartStore";
import CartOnePosition from "./CartOnePosition";

interface IProps {
  positions: IExtra[];
  onClickDelButton: (id: string) => void;
}

const CartPositions = (props: IProps) => {
  return (
    <div className={s.CartPositions}>
      {props.positions.map((el, i) => {
        return (
          <CartOnePosition
            key={el.id + Math.random()}
            id={el.id}
            onClickDelButton={props.onClickDelButton}
          />
        );
      })}
    </div>
  );
};

export default CartPositions;
