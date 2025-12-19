import { AboutSectionElement } from "../about-data";
import styles from "./card.module.scss";

interface CardImage {
  item: AboutSectionElement;
  index: number;
  direction: "left" | "right";
}

export const CardImage = ({ item, index, direction }: CardImage) => (
  <div className={styles.image}>
    <img
      src={item.image}
      alt={item.title}
      className={
        index % 2 === (direction === "left" ? 0 : 1) ? styles.hoverLeft : styles.hoverRight
      }
    />
  </div>
);
