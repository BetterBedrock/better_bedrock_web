import { Card, CardDivider } from "~/components/bedrock/card";
import { styles } from ".";
import { MainAd } from "~/pages/downloads/components/main/main-ad";
import { MainProjects } from "~/pages/downloads/components/main/main-projects";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Banner } from "~/components/bedrock/banner";

export const Main = () => {
  return (
    <>
      <Card sub className={styles.main}>
        <div className={styles.downloads}>
          <BedrockText text="Featured" type="h1" color="white" font="Minecraft" textAlign="start" />
        </div>
        <CardDivider sub />
        <div className={styles.downloads}>
          <MainAd />
        </div>
      </Card>
      <Card sub className={styles.main}>
        <div className={styles.downloads}>
          <Banner
            type="info"
            message="Our creators get anti-bypass for ads & 100% of the ad revenue!"
          />
          <BedrockText text="Projects" type="h1" color="white" font="Minecraft" textAlign="start" />
        </div>
        <CardDivider sub />
        <div className={styles.downloads}>
          <MainProjects />
        </div>
      </Card>
    </>
  );
};
