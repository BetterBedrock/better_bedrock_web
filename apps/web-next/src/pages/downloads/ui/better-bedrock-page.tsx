import { MAIN_LIST } from "@/public/content/better-bedrock";
import { BetterBedrockArchiveButton } from "@/pages/downloads/ui/better-bedrock-archive-button";
import { BetterBedrockBanner } from "@/pages/downloads/ui/better-bedrock-banner";
import { BetterBedrockItemsList } from "@/pages/downloads/ui/better-bedrock-items-list";
import { DownloadsHeading } from "@/shared/ui/downloads-heading";

import { Card } from "@/shared/ui/card";

import styles from "./better-bedrock.module.scss";
import { loadDownloadsBetterBedrockPageData } from "@/pages/downloads/api/load-downloads-better-bedrock-page-data";

export interface BetterBedrockPageProps {
  searchParams?: Promise<{ archived?: boolean }>;
}

export const revalidate = 300;

export const BetterBedrockPage = async ({
  searchParams,
}: BetterBedrockPageProps) => {
  const categoryDownloads = MAIN_LIST;
  const loadedParams = await searchParams;
  const simpleCategories = await loadDownloadsBetterBedrockPageData({
    loadedParams,
  });

  if (simpleCategories.length < 1) {
    return <BetterBedrockBanner />;
  }

  // unused
  const archivedCategory = simpleCategories.find((c) => c.title === "Archived");

  return (
    <>
      {simpleCategories.map((category) => (
        <Card key={category.title} fullWidth>
          <Card.Body>
            <DownloadsHeading
              title={category.title}
              description={category.description}
            />
          </Card.Body>
          <Card.Divider />
          <Card.Body>
            <BetterBedrockItemsList
              categoryId={categoryDownloads.id}
              category={category}
            />
          </Card.Body>
        </Card>
      ))}

      {archivedCategory && (
        <div className={styles.footer}>
          <BetterBedrockArchiveButton searchParams={loadedParams} />
        </div>
      )}
    </>
  );
};
