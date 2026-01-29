import { Banner } from "@/shared/ui/banner";
import { BedrockText } from "@/shared/ui/bedrock-text";
import { Routes } from "@/shared/lib/utils";
import { Link } from "@/shared/ui/link";
import styles from "./hero.module.scss";

interface HeroCreatorBannerProps {
  creatorName?: string;
}

export const HeroCreatorBanner = ({ creatorName }: HeroCreatorBannerProps) => (
  <Banner
    type="info"
    message={
      <BedrockText textAlign="center" type="p" color="white">
        Monetize your content and earn revenue from ADs like @
        {creatorName ?? "Unknown"}. You can do the same - upload your project
        and start earning now!{" "}
        <Link link={Routes.MONETIZATION} className={styles.link}>
          Check this tutorial to see how.
        </Link>
      </BedrockText>
    }
  />
);
