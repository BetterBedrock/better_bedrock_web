import { DraftsAction } from "@/features/users/components/profile/drafts-action";
import { GridDownloadCardList } from "@/components/grid-download-card-list/grid-download-card-list";
import { Banner } from "@/components/banner";
import { loadProfileDraftsPage } from "@/features/project/server/load-profile-drafts-page-data";

import styles from "./drafts.module.scss";

interface DraftsProps {
  params?: Promise<{ name: string }>;
}

export default async function Drafts({ params }: DraftsProps) {
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
}
