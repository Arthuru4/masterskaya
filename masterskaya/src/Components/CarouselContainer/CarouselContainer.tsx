import React from "react";
import s from "./CarouselContainer.module.scss";
// https://www.npmjs.com/package/react-multi-carousel
import Carousell from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ICarouselBlock } from "../Content/Home/Home";
// @ts-ignore
import { A } from "hookrouter";

interface Interface {
  carouselArr: ICarouselBlock[];
  options?: any
  history?: any;
}
const responsive = {
  desktop: {
    breakpoint: { max: 5000, min: 760 },
    items: 1
  },

  mobile: {
    breakpoint: { max: 760, min: 0 },
    items: 1
  }
};

const Carousel = (props: Interface) => {
  return (
    <React.Fragment>
      <div className={s.Carousel}>
        <Carousell
          autoPlay={typeof props.options?.autoPlay === "boolean" ? props.options?.autoPlay : true}
          infinite={true}
          autoPlaySpeed={4000}
          responsive={responsive}
          showDots={typeof props.options?.showDots === "boolean" ? props.options?.showDots : true}
          removeArrowOnDeviceType={Array.isArray(props.options?.removeArrowOnDeviceType) ? props.options?.removeArrowOnDeviceType : ["mobile"]}
        >
          {props.carouselArr.map(
            (el: ICarouselBlock, i: string | number | undefined) => {
              return (
                <div key={i}>
                  {el.title && <div className={s.blockTitle}>{el.title}</div>}
                  {el.link &&   <A draggable={false} href={el.link}> <div className={s.linkButton}>TRY IT</div></A>}

                  <div className={s.imgBlock}>
                    <img src={el.src} draggable={false} />
                  </div>

                </div>
              );
            }
          )}
        </Carousell>
      </div>
    </React.Fragment>
  );
};

export default Carousel;
