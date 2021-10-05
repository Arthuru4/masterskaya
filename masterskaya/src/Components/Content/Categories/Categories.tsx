import React, { useState } from "react";
import s from "./Categories.module.scss";
import bgImg from "../../../assets/rev-bg.jpg";
import { CatTypes } from "../../../models/enums/CatTypes";
import { IProduct, IProductObject } from "../../../scripts/mobx/productsStore";
import { inject, observer } from "mobx-react";

const A = require("hookrouter").A;

const Categories = inject("productsStore")(
  observer((props: any) => {
    const productsStore = props.productsStore;
    if (Object.keys(productsStore.allProducts).length === 0) {
      productsStore.setProducts();
    }

    let [isOpenBlocks, setIsOpenBlocks] = useState({});
    const productsData = productsStore.allProducts;

    const getBlock = (data: IProduct, i: number) => {
      return (
        <A
          className={s.arr_link}
          key={i}
          draggable={false}
          href={`/item${data.id}`}
        >
          <div className={s.arr_block}>
            <div
              className={s.arr_block_image}
              style={{
                backgroundImage: `url(${bgImg})`,
              }}
            >
              <img src={data.preview} alt="" />
            </div>
            <div className={s.arr_block_legend}>
              <div className={s.arr_block_legend_articular}>
                артикул {data.id}
              </div>
              <div className={s.arr_block_legend_price}>
                <span> {data.price}</span> грн
              </div>
              <div className={s.arr_block_legend_description}>
                {data.description}
              </div>
            </div>
          </div>
        </A>
      );
    };

    const hideShowBody = (text: any) => {
      // @ts-ignore
      setIsOpenBlocks({ ...isOpenBlocks, [text]: !isOpenBlocks[text] });
    };

    const getBody = (data: IProductObject) => {
      const keys: CatTypes[] = Object.keys(data) as CatTypes[];
      if (Object.keys(isOpenBlocks).length === 0) hideShowBody(keys[0]);
      return (
        <div className={s.body}>
          {keys.map((key: CatTypes) => {
            return (
              <div key={key} className={s.arr}>
                <div className={s.arr_title} onClick={() => hideShowBody(key)}>
                  {key}
                  {
                    <div
                      className={`${s.arrow_icon} ${
                        // @ts-ignore
                        isOpenBlocks[key] ? s.open : ""
                      } `}
                    >
                      <div className={s.left_bar}></div>
                      <div className={s.right_bar}></div>
                    </div>
                  }
                </div>

                {
                  // @ts-ignore
                  isOpenBlocks[key] && (
                    <div className={s.arr_body}>
                      {data &&
                        // @ts-ignore
                        data[key].map((_data, i) => {
                          return getBlock(_data, i);
                        })}
                    </div>
                  )
                }
              </div>
            );
          })}
        </div>
      );
    };
    return (
      <div className={s.Categories}>
        <div className={s.title}>Изделия </div>
        {getBody(productsData)}
      </div>
    );
  })
);

export default Categories;
