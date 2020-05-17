import React from "react";
import s from "./Footer.module.scss";
import { A } from "hookrouter";
import viber from "../../assets/viberbw.png";
import telegram from "../../assets/telegram-logo.png";
// {
//     img: viber,
//         link: "viber://chat?number=%2B380662803729",
//     text: "+38 066 280 37 29"
// }
const Footer = () => {
  return (
    <div className={s.Footer}>
      <div>
        <div>
          developed by <a href="https://github.com/Arthuru4" target="_blank">Arthuru4</a>
        </div>
        <div>
          <a href="viber://chat?number=%2B380960232662" target="_blank">
            <img src={viber} alt="Viber link" />
          </a>
          <a href="https://telegram.im/@Arthuru4" target="_blank">
            <img src={telegram} alt="Telegram link" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
