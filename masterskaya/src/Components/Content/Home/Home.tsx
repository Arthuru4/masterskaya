import React, { useEffect } from "react";
import s from "./Home.module.scss";
import Carousel from "../../CarouselContainer/CarouselContainer";
import bgImg from "../../../assets/rev-bg.jpg";
import bag1 from "../../../assets/bag1.png";
import lips from "../../../assets/lips.png";
import { inject } from "mobx-react";
import { observer } from "mobx-react-lite";
import { ProductsStore } from "../../../scripts/mobx/productsStore";
// import { A } from "hookrouter";
const A = require('hookrouter').A

export interface ICarouselBlock {
  title?: string;
  link?: string;
  src: string;
}

interface IProps {
  productsStore?: ProductsStore;
}

const carouselArr = [
  {
    title: "Сумки с вышивкой",
    link: "/categories",
    src: bag1
  },
  {
    title: "Вышивка на тканях",
    link: "/categories",
    src: lips
  },
  {
    title: "Соберите сами",
    link: "/generator",
    src: lips
  }
];
const Home = inject("productsStore")(
  observer((props: IProps) => {
    // @ts-ignore
    if (Object.keys(props.productsStore?.allProducts).length === 0) {
      props.productsStore?.setProducts();
    }
    useEffect(() => {}, [
      props.productsStore?.popular,
      props.productsStore?.allProducts
    ]);
    return (
      <div className={s.Home}>
        <div
          className={s.HomeCarousel}
          style={{
            backgroundImage: `url(${bgImg})`
          }}
        >
          <Carousel carouselArr={carouselArr} />
        </div>
        <div className={s.popular}>
          <div className={s.popularTitle}>Популярное:</div>
          <br />
          <div className={s.popularBody}>
            {props.productsStore?.popular.map((el, key) => {
              return (
                <div key={key} className={s.block}>
                  <A
                    className={s.arr_link}
                    draggable={false}
                    href={`/item${el.id}`}
                  >
                    <div
                      className={s.blockBody}
                      style={{
                        backgroundImage: `url(${bgImg})`
                      }}
                    >
                      <img src={el.preview} alt="" />
                    </div>

                    {/*<div className={s.blockTitle}>Блок с товаром</div>*/}
                  </A>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  })
);

export default Home;
