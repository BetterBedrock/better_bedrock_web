import { CreatorCard } from "../../bedrock/creators-card/creators-card";
import styles from "./creators.module.css";

export const CreatorsCard = () => (
  <div className={styles.cards_wrapper}>
    <CreatorCard
      width="auto"
      height="100px"
      name="Ambro"
      description={["Texture Pack", "Website", "Discord"]}
    ></CreatorCard>
    <CreatorCard
      width="auto"
      height="100px"
      name="iDarkQ"
      description={[
        "Mobile App",
        "Android Client",
        "Website",
        "Windows Client",
      ]}
    ></CreatorCard>
  </div>
);
