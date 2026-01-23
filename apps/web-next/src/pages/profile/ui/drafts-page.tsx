import { DraftsAction } from "./drafts-action";
import { GridDownloadCardList } from "@/shared/ui/grid-download-card-list";
import { Banner } from "@/shared/ui/banner";

import styles from "./drafts.module.scss";
import { loadProfileDraftsPageData } from "@/pages/profile/api/load-profile-drafts-page-data";

interface DraftsPageProps {
  params?: Promise<{ name: string }>;
}

export const DraftsPage = async ({ params }: DraftsPageProps) => {
  const { isOwner, drafts } = await loadProfileDraftsPageData(params);

  return (
    <div className={styles.list}>
      {isOwner && <DraftsAction />}
      {drafts.length > 0 ? (
        <GridDownloadCardList projects={drafts} mode="edit" />
      ) : (
        <Banner type="neutral" message="No draft projects available" />
      )}
    </div>
  );
};
