import React from "react";
import cart from "../../assets/cart.svg"
interface IProps {
  fill?:string
}

const CartIcon = (props: IProps) => {
    return (
      <div >
          <object data={cart} type=""></object>
      </div>
    );
  };

export default CartIcon;
