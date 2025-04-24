import { GridCard } from "~/components/bedrock/grid-card/grid-card";
import { THEMES_LIST } from "~/pages/downloads/downloads-data";
import { styles } from ".";

export const BetterBedrockThemesList = () => (
  <div className={styles.themes}>
    {THEMES_LIST.map((theme) => (
      <GridCard
        useCustomThumbnail={true}
        title={theme.title}
        description={theme.description}
        customThumbnailImageUrl={theme.imageAssetUrl}
        // link={tutorial.link}
      />
    ))}
  </div>
);
