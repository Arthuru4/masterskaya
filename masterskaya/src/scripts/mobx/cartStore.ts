import { createContext } from "react";
import { action, computed, observable } from "mobx";
import { IProduct } from "./productsStore";

export interface IExtra {
  id: string,
  iProduct: IProduct
  _count: number,
  _sum?: number | null,
}

export class CartStore {
  @observable private isOpen: boolean = false;
  @observable private _positions: IExtra[] = [];

  @action public openCloseCart() {
    this.isOpen = !this.isOpen;
  }

  @action public deletePositions() {
    this._positions = []
  }

  @action public addPosition(pos: IProduct) {
    for (let a of this._positions) {
      if (a.id === pos.id) return;
    }

    this._positions.push({ id: pos.id, iProduct: pos, _count: 1, _sum: pos.price});
  }

  @action public _includes(id: string) {
    for (let a in this._positions) {
      if (this._positions[a].id === id) {
        return true;
      }
    }
    return false;
  }

  @action public changeCount(id: string, increase: boolean) {
    for (let a in this._positions) {
      if (this._positions[a].id === id) {
        if (increase) {
          this._positions[a]._count++;
          this._positions[a]._sum = (this._positions[a].iProduct.price || 0) * this._positions[a]._count
        } else if (this._positions[a]._count > 1) {
            this._positions[a]._count--;
            this._positions[a]._sum = (this._positions[a].iProduct.price || 0) * this._positions[a]._count
        }
      }
    }
  }

  @action public setCount(id: string, count: number) {
    if (count < 1) return;

    for (let a in this._positions) {
      if (this._positions[a].id === id) {
        this._positions[a]._count = count;
        this._positions[a]._sum = (this._positions[a].iProduct.price || 0) * count;
        break;
      }
    }
  }

  @action public deletePosition(id: string) {
    for (let a in this._positions) {
      if (this._positions[a].id === id) {
        this._positions.splice(+a, 1);
        break;
      }
    }
  }

  @computed public get isOpenCart() {
    return this.isOpen;
  }
  @computed public get _sum() {
    return this._positions.reduce((a, b) => {return a + (b._sum || 0)}, 0)
  }

  @computed public get positions() {
    return this._positions;
  }
}

const cartStore = new CartStore();
export const cartStoreContext = createContext(cartStore);
export default cartStore;
