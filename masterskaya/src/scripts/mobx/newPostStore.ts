import { createContext } from "react";
import { action, computed, observable } from "mobx";
import {getCity, getWarehouses} from "../../modules/newPostAxiosService";
import {delivery} from "../../Components/Order/Order";

export interface IUserData {
  name?: string;
  mobile: string;
  city?: string;
  deliveryType: delivery;
  deliveryData?: string

}
export class NewPostStore {
  // @observable private deviceType: DeviceType = DeviceType.IS_MOBILE;
  @observable private userData: IUserData = {
    name: "",
    mobile: "",
    city: "",
    deliveryType: delivery.post,
    deliveryData: ''
  };
  @observable private options: any[] = [];
  @observable private deliveryDataOptions: {city?: string, options?: any[]} = {};

  @action public setData(
    type: keyof IUserData,
    data: IUserData[keyof IUserData]
  ) {
    if (type === 'city') {
      this.updateOptions(data)
    }

      // @ts-ignore
      this.userData[type] = data;
  }
  private updateOptions = (value: string | undefined | delivery) => {
    getCity(value).then((resp: { data: any; }) => {
      if (resp.data.data[0]?.Addresses) {
        this.options = resp.data.data[0]?.Addresses.map((e: any) => {
          return {main: e.MainDescription, present: e.Present}
        });
      } else {
        this.options = []
      }
    })
  };
  @action public updateDataOptions = (_delete?: boolean) => {
    if (!this.userData.city || this.userData.city.length < 2 || _delete) {
      if (this.deliveryDataOptions.city) {
        this.deliveryDataOptions = {city: '', options:[]}
      }
      if (this.userInfo.deliveryData) {
        this.userInfo.deliveryData = '';
      }
    } else if (this.deliveryDataOptions.city !== this.userData.city) {
      getWarehouses(this.userData.city).then((resp: { data: any; }) => {
        if (resp.data.data.length) {
          this.deliveryDataOptions = {city: this.userData.city, options:
                resp.data.data.map((e: any) => {
                  return e.DescriptionRu
                })
          }

        } else {
          this.deliveryDataOptions = {city: '', options:[]}
        }
      })
    }

  };
  // @action public setIsDesktop() {
  //   this.deviceType = DeviceType.IS_DESKTOP;
  // }
  @computed public get userInfo() {
    return this.userData;
  }
  @computed public get cities() {
    return this.options;
  }
  @computed public get deliveries() {
    return this.deliveryDataOptions;
  }
}

const newPostStore = new NewPostStore();
export const newPostStoreContext = createContext(newPostStore);
export default newPostStore;
