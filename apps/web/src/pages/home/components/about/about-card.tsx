import { AboutSectionElement } from ".";
import { styles } from ".";
import { CardImage, CardHeader } from "./card";

interface AboutCardProps {
  direction: "left" | "right";
  item: AboutSectionElement;
  index: number;
}

export const AboutCard = ({ item, index, direction }: AboutCardProps) => {
  return (
    <div
      key={index}
      className={styles.about}
      style={{
        flexDirection: index % 2 === (direction === "left" ? 0 : 1) ? "row" : "row-reverse",
      }}
    >
      <CardImage item={item} index={index} direction={direction} />
      <CardHeader item={item} />
    </div>
  );
};
