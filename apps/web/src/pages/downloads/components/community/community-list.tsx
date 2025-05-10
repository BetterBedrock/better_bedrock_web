import { THEMES_LIST } from "~/pages/downloads/downloads-data";
import { styles } from ".";
import { GridDownloadCard } from "~/components/bedrock/grid-download-card/grid-download-card";

export const CommunityList = () => (
  <div className={styles.list}>
    {THEMES_LIST.map((theme) => (
      <GridDownloadCard
        title={theme.title}
        description={theme.description}
        thumbnailImageUrl={theme.imageAssetUrl}
      />
    ))}
  </div>
);
