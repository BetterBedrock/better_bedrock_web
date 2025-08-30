import { Card, CardDivider } from "~/components/bedrock/card";
import { styles } from ".";
import { MainAd } from "~/pages/downloads/components/main/main-ad";
import { MainProjects } from "~/pages/downloads/components/main/main-projects";
import { BedrockText } from "~/components/bedrock/bedrock-text";

export const Main = () => {
  return (
    <Card sub className={styles.main}>
      <div className={styles.downloads}>
        <BedrockText text="Downloads" type="h1" color="white" font="Minecraft" textAlign="start" />
      </div>
      <CardDivider sub />
      <div className={styles.downloads}>
        <MainAd />
        <MainProjects />
      </div>
    </Card>
  );
};
