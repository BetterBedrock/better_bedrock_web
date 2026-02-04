import clsx from "clsx";
import { BedrockText } from "@/shared/ui/bedrock-text";
import { Card } from "@/shared/ui/card";
import { Link } from "@/shared/ui/link";

import styles from "./featured-card.module.scss";
import Image from "next/image";

interface FeaturedCardBannerProps {
  image: string;
  color: string;
  text: string;
  link: string;
  grid: "bb" | "extensions" | "side";
}

export const FeaturedCardBanner = ({
  image,
  color,
  text,
  link,
  grid,
}: FeaturedCardBannerProps) => (
  <Card className={clsx(styles.banner, styles[grid])}>
    <Link link={link} className={styles.link}>
      <Image
        alt={`Featured Card ${text} Banner`}
        width={640}
        height={360}
        src={image}
        className={styles.image}
      />
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
