import { createContext } from "react";
import { action, computed, observable } from "mobx";
// @ts-ignore
import { CatTypes } from "../../models/enums/CatTypes";
import { getAllProducts } from "../../modules/axiosService";

export interface IProduct {
  id: string;
  type?: CatTypes;
  preview: string;
  img?: string[];
  textile_art?: number | null;
  img_art?: string;
  price?: number | null;
  description: string;
}

export interface IProductObject {
  [CatTypes.BAG]?: IProduct[];
  [CatTypes.PILLOWCASE]?: IProduct[];
}

export class ProductsStore {
  @observable private products: IProductObject = {};
  @observable private _popular: string[] = ['1001', '1002'];
  @observable private item: IProduct = {
    id: "",
    preview: "",
    img: [],
    textile_art: null,
    img_art: "",
    price: null,
    description: ""
  };

  @action.bound public setProducts() {
    getAllProducts().then(response => {
      // @ts-ignore
      this.products = { ...this.products, ...response.data };
      // this._popular = [...this._popular]
    });
  }
  @action.bound public setCurrentItem(id: string) {
    for (let product in this.products) {
      // @ts-ignore
      for (let _item in this.products[product]) {
        // @ts-ignore
        if (this.products[product][_item].id === id) {
          // @ts-ignore

          this.item = this.products[product][_item];
          return;
        }
      }
    }
    Object.keys(this.products).forEach(key => {
      // @ts-ignore
      this.products[key].forEach(el => {});
    });
  }

  @action.bound public dropCurrentItem() {
    this.item = {
      id: "",
      preview: "",
      img: [],
      textile_art: null,
      img_art: "",
      price: null,
      description: ""
    };
  }

  @computed public get currentItem() {
    return this.item;
  }
  @computed public get popular() {
    let tempArr = [];
    for (let p of this._popular) {
      for (let _prod of Object.keys(this.products)) {
        // @ts-ignore
        let b = this.products[_prod]
        for (let prod in b) {
          if (b[prod].id === p) {
            tempArr.push(b[prod])
          }
        }
      }
    }

    return tempArr
  }

  @computed public get allProducts() {
    return this.products;
  }
}

const productsStore = new ProductsStore();
export const productsStoreContext = createContext(productsStore);
export default productsStore;
