import React, {useContext, useEffect, useState} from "react";
import s from "./Tab.module.scss";
import { IProduct } from "../../../scripts/mobx/productsStore";
import Carousel from "../../CarouselContainer/CarouselContainer";
import { observer } from "mobx-react-lite";
import { deviceStoreContext } from "../../../scripts/mobx/deviceStore";
import { DeviceType } from "../../../models/enums/DeviceType";

interface IProps {
  currentItem: IProduct;
  buyButtonHandler: (prod: IProduct) => void
  inCart: boolean
}

const MainTab = observer((props: IProps) => {
  const deviceStore = useContext(deviceStoreContext);

  const isMobile = deviceStore.devType === DeviceType.IS_MOBILE;

  const imageBlock = (prev: string, img?: string[]) => {
    let srcArr = [prev];
    if (img && img.length > 0) {
      srcArr.push(...img)
    }
    return (
      <div className={s.Image}>
        {isMobile && (
          <Carousel
            carouselArr={[{ src: prev }]}
            options={{
              removeArrowOnDeviceType: ["mobile", "desktop"],
              autoPlay: false
            }}
          />
        )}
        {!isMobile && (
          <div className={s.desktopContent}>
            <div className={s.leftSlider}>
              {srcArr.map(el => {
                return (
                  <div key={el} className={s.imgItem}>
                    <img src={el} alt="" />
                  </div>
                );
              })}
            </div>
            <img src={prev} alt="" />
          </div>
        )}
      </div>
    );
  };
  useEffect(() => {
      // console.error(props.inCart)
  }, [props.inCart])

  const getContext = () => {
    return (
          <div className={s.block_body_tab_main}>
            {imageBlock(props.currentItem.preview, props.currentItem.img)}
            <div className={s.priceBlock}>
              <div className={s.price}>{props.currentItem.price
                ? props.currentItem.price + "₴"
                : "Нет в наличии"}
              </div>
              <div onClick={() => props.buyButtonHandler(props.currentItem)} className={s.buyButton}>{props.currentItem.price ? !props.inCart ?  'Купить' : "Уже в корзине" : 'Заказать'}</div>
            </div>
            <div className={s.legendBlock}>
              {/*<div>артикул изделия: {props.currentItem.id}</div>*/}
              {/*<span>Код:</span> {props.currentItem.img_art}*/}
<div className={s.description}>
              <div>
                ткань: шафран{" "}
                <span className={s.textile_art}>
                  арт. {props.currentItem.textile_art}
                </span>
              </div>
            </div>
            <div>
              <br />
              Описание: <br />
              {props.currentItem.description}
            </div>
            </div>
          </div>)
  }


  return (
      getContext()
  );
});

export default MainTab;
