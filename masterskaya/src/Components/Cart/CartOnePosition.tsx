import React, {useCallback, useEffect} from "react";
import s from "./Cart.module.scss";
import { CartStore } from "../../scripts/mobx/cartStore";
import { inject } from "mobx-react";
import { observer } from "mobx-react-lite";
import { Close } from '@material-ui/icons';

interface IProps {
  id: string;
  onClickDelButton: (id: string) => void;
  cartStore?: CartStore;
}

const CartOnePosition = inject("cartStore")(
  observer((props: any) => {
    const getPosition = (id: string) => {
      const positions = props.cartStore?.positions;
      for (let a in positions) {
        if (positions[a].id === id) {
          return +a;
        }
      }
      return 999
    };
    const position = getPosition(props.id);

    const changeCount = useCallback((e : any) => {
        if (e.target.value && !isNaN(+e.target.value)) {
            props.cartStore.setCount(props.id, +e.target.value)
        }
      }, [props.cartStore.positions]);
    useEffect(() => {
    }, [props.cartStore.positions]);
    return (
      <div className={s.cartPosition}>
        <div
          className={s.delCartPosition}
          onClick={() => props.onClickDelButton(props.id)}
        >
        <Close></Close>
        </div>
        <div className={s.imgWrapper}>
          <img src={props.cartStore.positions[position].iProduct.preview} alt="" />
        </div>

        <div className={s.posPrice}>{props.cartStore.positions[position].iProduct.price} грн</div>

        <div className={s.posCounter}>
          <div onClick={() => props.cartStore.changeCount(props.id, false)}>-</div>
          <input type="text" value={props.cartStore.positions[position]._count || 1} onChange={changeCount} />
          <div onClick={() => props.cartStore.changeCount(props.id, true)}>+</div>
        </div>

        <div className={s.posSum}>Сумма {props.cartStore.positions[position]._sum} грн</div>
      </div>
    );
  })
);

export default CartOnePosition;
