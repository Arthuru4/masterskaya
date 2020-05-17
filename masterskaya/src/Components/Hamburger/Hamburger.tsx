import React from "react";
import s from "./Hamburger.module.scss";

interface IProps {
  onClick: () => void;
  isOpen: boolean;
}

const Hamburger = (props: IProps) => {
  const a = props.isOpen ? s.open : "";

  return (
    <div className={`${s.Hamburger} ${a}`} onClick={props.onClick}>
      <span />
      <span />
      <span />
      <span />
    </div>
  );
};

export default Hamburger;
