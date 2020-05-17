import React from "react";
import s from "./About.module.scss";
import about1 from "../../../assets/about1.jpg";
import Carousel from "../../CarouselContainer/CarouselContainer";

const carouselArr = [
  {
    src: about1
  },
  {
    src: about1
  },
  {
    src: about1
  },
  {
    src: about1
  }
];
const About = () => {
  return (
    <div className={s.About}>
      <Carousel carouselArr={carouselArr} />

      <div className={s.block}>
        <div className={s.text}>
          <div className={s.head}>
            <h2> Lorem Ipsum </h2>
          </div>
          это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem
          Ipsum является стандартной "рыбой" для текстов на латинице с начала
          XVI века. В то время некий безымянный печатник создал большую
          коллекцию размеров и форм шрифтов, используя Lorem Ipsum для
          распечатки образцов. Lorem Ipsum не только успешно пережил без
          заметных изменений пять веков, но и перешагнул в электронный дизайн.
          Его популяризации в новое время послужили публикация листов Letraset с
          образцами Lorem Ipsum в 60-х годах и, в более недавнее время,
          программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых
          используется Lorem Ipsum.
          <div className={s.body}></div>
        </div>
      </div>
    </div>
  );
};

export default About;
