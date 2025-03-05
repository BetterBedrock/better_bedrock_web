import { BedrockText } from "components/bedrock/text";
import React from "react";
import styles from "./about.module.css";
import { useMediaQuery } from "react-responsive";

interface AboutProp {
  direction?: "left" | "right";
  items: {
    title: string;
    description: string;
    image: string;
  }[];
}

export const AboutItems: React.FC<AboutProp> = ({ items, direction = "left" }) => {
  const mediaMaxWidth = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <>
      {items.map((item, index) => (
        <div
          key={index}
          className={styles.aboutItemsContainer}
          style={{
            flexDirection: mediaMaxWidth
              ? "column"
              : index % 2 === (direction === "left" ? 0 : 1)
                ? "row"
                : "row-reverse",
          }}
        >
          <div className={styles.aboutItemsImageCotnainer}>
            <img src={item.image} alt={item.title} className={`${styles.aboutItemsImage} ${(index % 2 === (direction === "left" ? 0 : 1) ? `${styles.aboutItemsImageHoverEffect1}` : `${styles.aboutItemsImageHoverEffect2}`)}`}></img>
          </div>

          <div className={styles.aboutItemsContent}>
            <BedrockText
              text={item.title}
              type={"h1"}
              font="MinecraftTen"
              color="white"
              textAlign="center"
            ></BedrockText>
            <BedrockText
              text={item.description}
              type={"p"}
              font="Mojangles"
              color="white"
              textAlign="center"
            ></BedrockText>
          </div>

        </div>
      ))}
    </>
  );
};
