import React, { useEffect } from "react";
// @ts-ignore
import { DeviceType } from "../../models/enums/DeviceType";
import DeviceStore from "../mobx/deviceStore";

export const ChangeMobileDesktop = () => {
  function getSize() {
    return [window.innerWidth, window.innerHeight];
  }

  function updateSize() {
    const isMobile = DeviceStore.devType === DeviceType.IS_MOBILE;
    let width = getSize()[0];

    if (width > 766 && isMobile) {
      DeviceStore.setIsDesktop();
    } else if (width < 766 && !isMobile) {
      DeviceStore.setIsMobile();
    }
  }

  useEffect(() => {
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return <React.Fragment />;
};
