import { MAIN_LIST } from "@/public/content/better-bedrock";
import { BetterBedrockArchiveButton } from "@/features/project/components/better-bedrock/better-bedrock-archive-button";
import { BetterBedrockBanner } from "@/features/project/components/better-bedrock/better-bedrock-banner";
import { BetterBedrockItemsList } from "@/features/project/components/better-bedrock/better-bedrock-items-list";
import { Heading } from "@/features/project/components/downloads-heading/downloads-heading";
import { loadDownloadsBetterBedrockPageData } from "@/features/project/server/load-downloads-better-bedrock-page-data";

import styles from "./better-bedrock.module.scss";
import { Card, CardBody, CardDivider } from "@/components/card/card";

export interface BetterBedrockProps {
  searchParams?: Promise<{ archived?: boolean }>;
}

export const revalidate = 300;

export default async function BetterBedrock({
  searchParams,
}: BetterBedrockProps) {
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
          <CardBody>
            <Heading title={category.title} description={category.description} />
          </CardBody>
          <CardDivider />
          <CardBody>
            <BetterBedrockItemsList
              categoryId={categoryDownloads.id}
              category={category}
            />
          </CardBody>
        </Card>
      ))}

      {archivedCategory && (
        <div className={styles.footer}>
          <BetterBedrockArchiveButton searchParams={loadedParams} />
        </div>
      )}
    </>
  );
}
