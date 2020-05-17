import { configure } from "mobx";
import deviceStore, { DeviceStore } from "./deviceStore";
import productsStore, {ProductsStore} from "./productsStore";
import cartStore, {CartStore} from "./cartStore";
import newPostStore, {NewPostStore} from "./newPostStore";

configure({
    disableErrorBoundaries: true
});

const StoreMobx = {
    deviceStore,
    cartStore,
    newPostStore,
    productsStore
};

export interface IStoreMobx {
    deviceStore: DeviceStore;
    cartStore: CartStore;
    productsStore: ProductsStore;
    newPostStore: NewPostStore;
}

export default StoreMobx;
