import Axios from "axios";
import { IProduct, IProductObject } from "../scripts/mobx/productsStore";
import { CatTypes } from "../models/enums/CatTypes";
import {IUserData} from "../scripts/mobx/newPostStore";
import {IExtra} from "../scripts/mobx/cartStore";

const BAGS: IProduct[] = [
  {
    "preview":
      "https://lh3.googleusercontent.com/d/1qrReLFz5vNBhDg_FDIy7dFJDDNzVfu0E",
    "id": "1001",
    "type": CatTypes.BAG,
    "img": [],
    "textile_art": null,
    "img_art": "",
    price: 800,
    "description": `Сумка с {такой} ткани {такого цвета}. Размер ...мм/...мм`
  },
  {
    preview:
      "https://lh3.googleusercontent.com/d/1U0zU_bxDhgIa0qxFlORy4MCGGxSPGbqO",
    id: "1002",
    type: CatTypes.BAG,
    img: [],
    textile_art: null,
    img_art: "",
    price: 800,
    description: `Сумка с {такой} ткани {такого цвета}. Размер ...мм/...мм`
  },
  {
    preview:
      "https://lh3.googleusercontent.com/d/1BYJErt6EcSs-SaP0bK9fd0jlx0MbrjEn",
    id: "1003",
    type: CatTypes.BAG,
    img: [""],
    textile_art: null,
    img_art: "",
    price: 800,
    description: `Сумка с {такой} ткани {такого цвета}. Размер ...мм/...мм`
  },
  {
    preview:
      "https://lh3.googleusercontent.com/d/142HzGBpLuLzEoODm7lMVHQ3X29knpoS4",
    id: "1004",
    type: CatTypes.BAG,
    img: [""],
    textile_art: null,
    img_art: "",
    price: 800,
    description: `Сумка с {такой} ткани {такого цвета}. Размер ...мм/...мм`
  },
  {
    preview:
      "https://lh3.googleusercontent.com/d/1b-rdO3M1W7lwimSf8w5mAz5dzcuQiV9Y",
    id: "1005",
    type: CatTypes.BAG,
    img: [""],
    textile_art: null,
    img_art: "",
    price: 800,
    description: `Сумка с {такой} ткани {такого цвета}. Размер ...мм/...мм`
  },
  {
    preview:
      "https://lh3.googleusercontent.com/d/1kcIktm1owACZCmoo8p1VHlOV6_PZMVWl",
    id: "1006",
    type: CatTypes.BAG,
    img: [""],
    textile_art: null,
    img_art: "",
    price: 800,
    description: `Сумка с {такой} ткани {такого цвета}. Размер ...мм/...мм`
  },
  {
    preview:
      "https://lh3.googleusercontent.com/d/1DXTQ3TkATXZr3eLI-zxvjZbjb36BX7xv",
    id: "1007",
    type: CatTypes.BAG,
    img: [""],
    textile_art: null,
    img_art: "",
    price: 800,
    description: `Сумка с {такой} ткани {такого цвета}. Размер ...мм/...мм`
  },
  {
    preview:
      "https://lh3.googleusercontent.com/d/1N6vvc8Lo_nbr0Gj2ua0GmYertQKb1KMM",
    id: "1008",
    type: CatTypes.BAG,
    img: [""],
    textile_art: null,
    img_art: "",
    price: 800,
    description: `Сумка с {такой} ткани {такого цвета}. Размер ...мм/...мм`
  },
  {
    preview:
      "https://lh3.googleusercontent.com/d/1H6BplqhGkdHRKaT104AwRaNfap4j_tdq",
    id: "1009",
    type: CatTypes.BAG,
    img: [""],
    textile_art: null,
    img_art: "",
    price: 800,
    description: `Сумка с {такой} ткани {такого цвета}. Размер ...мм/...мм`
  },
  {
    preview:
      "https://lh3.googleusercontent.com/d/1Xp8lBQeaO_MaplZeWn3W3HEIb9YPZYto",
    id: "1010",
    type: CatTypes.BAG,
    img: [""],
    textile_art: null,
    img_art: "",
    price: 800,
    description: `Сумка с {такой} ткани {такого цвета}. Размер ...мм/...мм`
  },
  {
    preview:
      "https://lh3.googleusercontent.com/d/1k_4WbA9RmTtQ8JARq-IvJXi-A8J3aZ8s",
    id: "1011",
    type: CatTypes.BAG,
    img: [""],
    textile_art: null,
    img_art: "",
    price: 800,
    description: `Сумка с {такой} ткани {такого цвета}. Размер ...мм/...мм`
  },
  {
    preview:
      "https://lh3.googleusercontent.com/d/1_hEsdt4d-h4kzvX3cAfWRhdCWXbskm2S",
    id: "1012",
    type: CatTypes.BAG,
    img: [""],
    textile_art: null,
    img_art: "",
    price: 800,
    description: `Сумка с {такой} ткани {такого цвета}. Размер ...мм/...мм`
  },
  {
    preview:
      "https://lh3.googleusercontent.com/d/14aQG1APP5Zv00KZ0i4KUsOvjRozsiLqO",
    id: "1013",
    type: CatTypes.BAG,
    img: [""],
    textile_art: null,
    img_art: "",
    price: 800,
    description: `Сумка с {такой} ткани {такого цвета}. Размер ...мм/...мм`
  },
  {
    preview:
      "https://lh3.googleusercontent.com/d/1uc679PuTFT2JWZGaySf3XlrEPaKVGzQe",
    id: "1014",
    type: CatTypes.BAG,
    img: [""],
    textile_art: null,
    img_art: "",
    price: 800,
    description: `Сумка с {такой} ткани {такого цвета}. Размер ...мм/...мм`
  },
  {
    preview:
      "https://lh3.googleusercontent.com/d/12n_FLJufovN70SaQslaKBB9GzN83RowT",
    id: "1015",
    type: CatTypes.BAG,
    img: [""],
    textile_art: null,
    img_art: "",
    price: 800,
    description: `Сумка с {такой} ткани {такого цвета}. Размер ...мм/...мм`
  },
  {
    preview:
      "https://lh3.googleusercontent.com/d/1L1kGzGxn7Dm8x-2D_rPJPY9CPVjHUiDi",
    id: "1016",
    type: CatTypes.BAG,
    img: [""],
    textile_art: null,
    img_art: "",
    price: 800,
    description: `Сумка с {такой} ткани {такого цвета}. Размер ...мм/...мм`
  }
];
const PILLOWCASE: IProduct[] = [
  {
    preview:
      "https://lh3.googleusercontent.com/d/1qrReLFz5vNBhDg_FDIy7dFJDDNzVfu0E",
    id: "1001",
    type: CatTypes.BAG,
    img: [""],
    textile_art: null,
    img_art: "",
    price: 100,
    description: `Сумка с {такой} ткани {такого цвета}. Размер ...мм/...мм`
  },
  {
    preview:
      "https://lh3.googleusercontent.com/d/1U0zU_bxDhgIa0qxFlORy4MCGGxSPGbqO",
    id: "1002",
    type: CatTypes.BAG,
    img: [""],
    textile_art: null,
    img_art: "",
    price: 800,
    description: `Сумка с {такой} ткани {такого цвета}. Размер ...мм/...мм`
  },
  {
    preview:
      "https://lh3.googleusercontent.com/d/1BYJErt6EcSs-SaP0bK9fd0jlx0MbrjEn",
    id: "1003",
    type: CatTypes.BAG,
    img: [""],
    textile_art: null,
    img_art: "",
    price: 800,
    description: `Сумка с {такой} ткани {такого цвета}. Размер ...мм/...мм`
  },
  {
    preview:
      "https://lh3.googleusercontent.com/d/142HzGBpLuLzEoODm7lMVHQ3X29knpoS4",
    id: "1004",
    type: CatTypes.BAG,
    img: [""],
    textile_art: null,
    img_art: "",
    price: 800,
    description: `Сумка с {такой} ткани {такого цвета}. Размер ...мм/...мм`
  },
  {
    preview:
      "https://lh3.googleusercontent.com/d/1b-rdO3M1W7lwimSf8w5mAz5dzcuQiV9Y",
    id: "1005",
    type: CatTypes.BAG,
    img: [""],
    textile_art: null,
    img_art: "",
    price: 800,
    description: `Сумка с {такой} ткани {такого цвета}. Размер ...мм/...мм`
  },
  {
    preview:
      "https://lh3.googleusercontent.com/d/1kcIktm1owACZCmoo8p1VHlOV6_PZMVWl",
    id: "1006",
    type: CatTypes.BAG,
    img: [""],
    textile_art: null,
    img_art: "",
    price: 800,
    description: `Сумка с {такой} ткани {такого цвета}. Размер ...мм/...мм`
  },
  {
    preview:
      "https://lh3.googleusercontent.com/d/1DXTQ3TkATXZr3eLI-zxvjZbjb36BX7xv",
    id: "1007",
    type: CatTypes.BAG,
    img: [""],
    textile_art: null,
    img_art: "",
    price: 800,
    description: `Сумка с {такой} ткани {такого цвета}. Размер ...мм/...мм`
  },
  {
    preview:
      "https://lh3.googleusercontent.com/d/1N6vvc8Lo_nbr0Gj2ua0GmYertQKb1KMM",
    id: "1008",
    type: CatTypes.BAG,
    img: [""],
    textile_art: null,
    img_art: "",
    price: 800,
    description: `Сумка с {такой} ткани {такого цвета}. Размер ...мм/...мм`
  },
  {
    preview:
      "https://lh3.googleusercontent.com/d/1H6BplqhGkdHRKaT104AwRaNfap4j_tdq",
    id: "1009",
    type: CatTypes.BAG,
    img: [""],
    textile_art: null,
    img_art: "",
    price: 800,
    description: `Сумка с {такой} ткани {такого цвета}. Размер ...мм/...мм`
  },
  {
    preview:
      "https://lh3.googleusercontent.com/d/1Xp8lBQeaO_MaplZeWn3W3HEIb9YPZYto",
    id: "1010",
    type: CatTypes.BAG,
    img: [""],
    textile_art: null,
    img_art: "",
    price: 800,
    description: `Сумка с {такой} ткани {такого цвета}. Размер ...мм/...мм`
  },
  {
    preview:
      "https://lh3.googleusercontent.com/d/1k_4WbA9RmTtQ8JARq-IvJXi-A8J3aZ8s",
    id: "1011",
    type: CatTypes.BAG,
    img: [""],
    textile_art: null,
    img_art: "",
    price: 800,
    description: `Сумка с {такой} ткани {такого цвета}. Размер ...мм/...мм`
  },
  {
    preview:
      "https://lh3.googleusercontent.com/d/1_hEsdt4d-h4kzvX3cAfWRhdCWXbskm2S",
    id: "1012",
    type: CatTypes.BAG,
    img: [""],
    textile_art: null,
    img_art: "",
    price: 800,
    description: `Сумка с {такой} ткани {такого цвета}. Размер ...мм/...мм`
  },
  {
    preview:
      "https://lh3.googleusercontent.com/d/14aQG1APP5Zv00KZ0i4KUsOvjRozsiLqO",
    id: "1013",
    type: CatTypes.BAG,
    img: [""],
    textile_art: null,
    img_art: "",
    price: 800,
    description: `Сумка с {такой} ткани {такого цвета}. Размер ...мм/...мм`
  },
  {
    preview:
      "https://lh3.googleusercontent.com/d/1uc679PuTFT2JWZGaySf3XlrEPaKVGzQe",
    id: "1014",
    type: CatTypes.BAG,
    img: [""],
    textile_art: null,
    img_art: "",
    price: 800,
    description: `Сумка с {такой} ткани {такого цвета}. Размер ...мм/...мм`
  },
  {
    preview:
      "https://lh3.googleusercontent.com/d/12n_FLJufovN70SaQslaKBB9GzN83RowT",
    id: "1015",
    type: CatTypes.BAG,
    img: [""],
    textile_art: null,
    img_art: "",
    price: 800,
    description: `Сумка с {такой} ткани {такого цвета}. Размер ...мм/...мм`
  },
  {
    preview:
      "https://lh3.googleusercontent.com/d/1L1kGzGxn7Dm8x-2D_rPJPY9CPVjHUiDi",
    id: "1016",
    type: CatTypes.BAG,
    img: [""],
    textile_art: null,
    img_art: "",
    price: 800,
    description: `Сумка с {такой} ткани {такого цвета}. Размер ...мм/...мм`
  }
];

const arrData: IProductObject = {
  [CatTypes.BAG]: BAGS,
  // [CatTypes.PILLOWCASE]: PILLOWCASE
};

export interface ISubmitData {
  name: string;
  email: string;
  msg: string;
}

export const submitRequest = (data: ISubmitData) => {
  return Axios({
    method: "POST",
    url: "http://localhost:3002/send",
    data
  });
};

interface IData {
  userInfo: IUserData,
  positions: IExtra[]
}
export const makeOrder = (data: IData) => {
  const positions = data.positions.map(el => {return{id: el.id, count: el._count, sum: el._sum}});

  return Axios({
    method: "POST",
    url: "http://localhost:3002/order",
    data: {...data, positions}
  });
};

export const getAllProducts = () => {
  return new Promise(resolve => {
    resolve({ data: arrData });
  });
};

export const setAllProducts = (data?: IProduct[]) => {
  return Axios({
    method: "POST",
    url: "http://localhost:3002/setproducts",
    data: data || BAGS
  });
};