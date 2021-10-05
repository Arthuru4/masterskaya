import React, { useContext, useState } from "react";
import s from "./Tab.module.scss";
import { IProduct } from "../../../scripts/mobx/productsStore";
import { observer } from "mobx-react-lite";
import { deviceStoreContext } from "../../../scripts/mobx/deviceStore";
import { DeviceType } from "../../../models/enums/DeviceType";
import MainTab from "./MainTab";

interface IProps {
  currentItem: IProduct;
  buyButtonHandler: (prod: IProduct) => void
  inCart: boolean

}
const ETabs = {
  MAIN: "Всё о товаре",
  CHARACTERISTICS: "Характеристики",
  PHOTOS: "Фото"
};

const Tab = observer((props: IProps) => {
  let [tab, setTab] = useState(ETabs.MAIN);
  const deviceStore = useContext(deviceStoreContext);

  const isMobile = deviceStore.devType === DeviceType.IS_MOBILE;
  const changeItem = (item: any) => {
    if (tab !== item) setTab(item);
  };

  const getHeader = () => {
    return (
      <div className={s.Header}>
        {Object.values(ETabs).map(el => {
          return (
            <div
              key={el}
              onClick={() => changeItem(el)}
              className={`${s.tabItem} ${el === tab ? s.active : ""}`}
            >
              {el}
            </div>
          );
        })}
      </div>
    );
  };

  const getContext = () => {
    return (
      <div className={s.Context}>
        {tab === ETabs.MAIN && <MainTab inCart={props.inCart} buyButtonHandler={props.buyButtonHandler} currentItem={props.currentItem} />}
      </div>
    );
  };

  return (
    <div className={s.Tab}>
      {getHeader()}
      {getContext()}
    </div>
  );
});

export default Tab;
