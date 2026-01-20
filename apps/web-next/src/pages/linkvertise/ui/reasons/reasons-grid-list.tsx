import clsx from "clsx";
import { ReasonsGridItem } from "./reasons-grid-item";
import styles from "./reasons.module.scss";

export const ReasonsGridList = () => (
  <div className={styles.grid}>
    <ReasonsGridItem
      title="Proven Experience"
      description="3 years of active development and platform optimization."
    />
    <ReasonsGridItem
      title="Advanced Anti-bypass"
      description="Built-in protection against bypasses to maximize earnings."
    />
    <ReasonsGridItem
      title="Top-Tier CPM"
      description="High-efficiency monetization with an average of €8.5 per 1000 downloads."
    />
    <ReasonsGridItem
      title="Global Traffic Hub"
      description="Reach a massive audience with hundreds of thousands of unique monthly visits."
    />
    <ReasonsGridItem
      title="Verified Industry Leader"
      description="A reputation built on years of delivering elite Minecraft Bedrock content."
    />
    <ReasonsGridItem
      title="Bedrock Dedicated"
      description="Zero distractions. We are fully specialized in the Minecraft Bedrock ecosystem."
    />
  </div>
);
