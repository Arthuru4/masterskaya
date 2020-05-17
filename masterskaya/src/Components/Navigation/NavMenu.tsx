import s from "./NavMenu.module.scss";
import React, { useContext, useState } from "react";
import Hamburger from "./../Hamburger/Hamburger";
import contentBg from "../../assets/content.jpg";
import { A } from "hookrouter";
import { deviceStoreContext } from "../../scripts/mobx/deviceStore";
import { DeviceType } from "../../models/enums/DeviceType";
import { observer } from "mobx-react-lite";

const NavMenu = observer((props: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const deviceStore = useContext(deviceStoreContext);
  const onClickHandler = () => {
    setIsOpen(!isOpen);
  };
  const isMobile = deviceStore.devType === DeviceType.IS_MOBILE;

  return (
    <div
      className={`${s.Navigation} ${!isMobile || isOpen ? s.open : ""}`}
      style={{
        backgroundImage: `url(${contentBg})`
      }}
    >
      {(!isMobile || isOpen) && (
        <div className={s.menu}>
          <A draggable={false} href="/" onClick={onClickHandler}>
            Главная
          </A>
          <A draggable={false} href="/categories" onClick={onClickHandler}>
            Изделия
          </A>
          <A draggable={false} href="/generator" onClick={onClickHandler}>
            Соберите сами
          </A>
          <A draggable={false} href="/about" onClick={onClickHandler}>
            О нас
          </A>

          <A draggable={false} href="/contact" onClick={onClickHandler}>
            Контакты
          </A>
        </div>
      )}

      {isMobile && <Hamburger isOpen={isOpen} onClick={onClickHandler} />}
    </div>
  );
});

export default NavMenu;
