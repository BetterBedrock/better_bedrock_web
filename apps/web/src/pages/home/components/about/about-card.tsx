import clsx from "clsx";
import { AboutSectionElement, styles } from ".";
import { CardImage, CardHeader } from "./card";

interface AboutCardProps {
  direction: "left" | "right";
  item: AboutSectionElement;
  index: number;
}

export const AboutCard = ({ item, index, direction }: AboutCardProps) => (
  <div
    key={index}
    className={clsx(
      styles.about,
      index % 2 === (direction === "left" ? 0 : 1) ? styles.row : styles.reverse,
    )}
  >
    <CardImage item={item} index={index} direction={direction} />
    <CardHeader item={item} />
  </div>
);
