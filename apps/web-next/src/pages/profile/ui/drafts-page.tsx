import { GridDownloadCardList } from "@/shared/ui/grid-download-card-list";
import { Banner } from "@/shared/ui/banner";

import styles from "./drafts.module.scss";
import { loadProfileDraftsPageData } from "@/pages/profile/api/load-profile-drafts-page-data";

interface DraftsPageProps {
  params?: Promise<{ name: string }>;
}

export const DraftsPage = async ({ params }: DraftsPageProps) => {
  const { drafts } = await loadProfileDraftsPageData(params);

  return (
    <div className={styles.list}>
      {drafts.length > 0 ? (
        <GridDownloadCardList projects={drafts} mode="edit" />
      ) : (
        <Banner variant="neutral" message="No draft projects available" />
      )}
    </div>
  );
};
