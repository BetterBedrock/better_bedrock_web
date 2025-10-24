import { Card } from "~/components/bedrock/card";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import clsx from "clsx";
import { Link } from "~/components/link";

import { styles } from ".";

interface FeaturedCardBannerProps {
  image: string;
  color: string;
  text: string;
  link: string;
  grid: "bb" | "extensions" | "side";
}

export const FeaturedCardBanner = ({ image, color, text, link, grid }: FeaturedCardBannerProps) => (
  <Card className={clsx(styles.banner, styles[grid])}>
    <Link link={link} className={styles.link}>
      <img src={image} className={styles.image} />
      <BedrockText
        extraClassName={styles.caption}
        text={text}
        type="h2"
        font="Minecraft"
        textAlign="start"
        color={color}
      />
    </Link>
  </Card>
);
