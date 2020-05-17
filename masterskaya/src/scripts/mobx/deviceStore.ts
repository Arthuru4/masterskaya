import { createContext } from "react";
import { action, computed, observable } from "mobx";
// @ts-ignore
import { DeviceType } from "../../models/enums/DeviceType";

export class DeviceStore {
  @observable private deviceType: DeviceType = DeviceType.IS_MOBILE;

  @action public setIsMobile() {
    this.deviceType = DeviceType.IS_MOBILE;
  }
  @action public setIsDesktop() {
    this.deviceType = DeviceType.IS_DESKTOP;
  }
  @computed public get devType() {
    return this.deviceType;
  }
}

const deviceStore = new DeviceStore();
export const deviceStoreContext = createContext(deviceStore);
export default deviceStore;
