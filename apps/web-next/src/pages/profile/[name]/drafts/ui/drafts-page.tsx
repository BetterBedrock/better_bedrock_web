import { DraftsAction } from "@/pages/profile/[name]/ui/drafts-action";
import { GridDownloadCardList } from "@/shared/ui/grid-download-card-list/grid-download-card-list";
import { Banner } from "@/shared/ui/banner";
import { loadProfileDraftsPage } from "@/entities/project/api/load-profile-drafts-page-data";

import styles from "./drafts.module.scss";

interface DraftsPageProps {
  params?: Promise<{ name: string }>;
}

export const DraftsPage = async ({ params }: DraftsPageProps) => {
  const { isOwner, drafts } = await loadProfileDraftsPage(params);

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
