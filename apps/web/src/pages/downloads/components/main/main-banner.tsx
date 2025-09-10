import { Card } from "~/components/bedrock/card";
import { styles } from ".";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import clsx from "clsx";
import { Link } from "~/components/link";
import { Routes } from "~/utils/routes";

interface MainBannerProps {
  image: string;
  color: string;
  text: string;
  link: string;
  grid: "bb" | "extensions" | "side";
}

export const MainBanner = ({ image, color, text, grid }: MainBannerProps) => (
  <Card className={clsx(styles.banner, styles[grid])}>
    <Link link={Routes.DOWNLOADS_BETTERBEDROCK} className={styles.link}>
      <img src={image} className={styles.image} />
      <BedrockText
        extraClassName={styles.caption}
        text={text}
        type="h1"
        font="Minecraft"
        color={color}
      />
    </Link>
  </Card>
);
