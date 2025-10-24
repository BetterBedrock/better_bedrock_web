import { Heading } from "~/pages/downloads/components/heading";
import { SimpleProjectDto } from "~/lib/api";
import { DownloadsListDto } from "~/assets/content/dto/downloads-list.dto";
import { DownloadsItemDto } from "~/assets/content/dto/downloads-item.dto";
import { CircularProgressIndicator } from "~/components/bedrock/circular-progress-indicator";

import {
  BetterBedrockArchiveButton,
  BetterBedrockItemsList,
  BetterBedrockBanner,
  styles,
  useFetchBetterBedrockProjects,
} from ".";

export interface SimpleCategory extends Omit<DownloadsListDto, "items"> {
  items: SimpleProjectDto[];
  categoryItems: DownloadsItemDto[];
}

export const BetterBedrock = () => {
  const { simpleCategories, categoryDownloads, showArchived, setShowArchived, handleSetActiveTab } =
    useFetchBetterBedrockProjects();

  if (!simpleCategories || !categoryDownloads) {
    return <CircularProgressIndicator size="medium" />;
  }

  if (simpleCategories.length < 1) {
    return <BetterBedrockBanner />;
  }

  const archivedCategory = simpleCategories.find((c) => c.title === "Archived");

  return (
    <>
      {simpleCategories.map((category) => (
        <div key={category.title} className={styles.category}>
          <Heading title={category.title} description={category.description} />
          <BetterBedrockItemsList categoryId={categoryDownloads.id} category={category} />
        </div>
      ))}

      <div className={styles.footer}>
        {archivedCategory && (
          <BetterBedrockArchiveButton
            showArchived={showArchived}
            setShowArchived={setShowArchived}
            setActiveTab={handleSetActiveTab}
          />
        )}
      </div>
    </>
  );
};
