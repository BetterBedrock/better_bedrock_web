import clsx from "clsx";
import { ReasonsGridItem, styles } from ".";

export const ReasonsGridList = () => (
  <div className={clsx(styles.grid, styles.cardContainer)}>
    <ReasonsGridItem title="Proven Quality" description="3 years of development" />
    <ReasonsGridItem title="Extra Protection" description="AD Anti-bypass" />
    <ReasonsGridItem title="Average Earnings" description="€8.5 per 1000 downloads" />
    <ReasonsGridItem title="Monthly Reach" description="Hundreds of thousands of visits" />
    <ReasonsGridItem title="Great Reputation" description="Known from excellent creations" />
    <ReasonsGridItem title="Single Game Focus" description="Minecraft Bedrock Edition" />
  </div>
);
