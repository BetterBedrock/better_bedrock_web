import { Card } from "~/components/bedrock/card";
import { styles } from ".";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import clsx from "clsx";

interface MainBannerProps {
  image: string;
  color: string;
  text: string;
  link: string;
  grid: "bb" | "extensions" | "side";
}

export const MainBanner = ({ image, color, text, grid }: MainBannerProps) => (
  <Card className={clsx(styles.banner, styles[grid])}>
    <img src={image} className={styles.image} />
    <BedrockText
      extraClassName={styles.caption}
      text={text}
      type="h1"
      font="Minecraft"
      color={color}
    />
  </Card>
);
