import { ThumbnailPlaceholder } from "./thumbnail-placeholder";
import { Card, CardDivider } from "@/_components/card";
import { DetailedProjectDto } from "@/_lib/api";

import styles from "./thumbnail.module.scss";
import { HeaderTitle } from "@/app/project/components/header/header-title";
import { SubmittedOverlay } from "@/app/project/components/submitted-overlay/submitted-overlay";

interface ThumbnailProps {
  detailedProject: DetailedProjectDto;
}

export const Thumbnail = ({ detailedProject }: ThumbnailProps) => (
  <Card sub className={styles.overlay}>
    {detailedProject.submitted && <SubmittedOverlay />}
    <div className={styles.editor}>
      <HeaderTitle title="Thumbnail" />
    </div>
    <CardDivider sub />
    <div className={styles.editor}>
      <ThumbnailPlaceholder />
    </div>
  </Card>
);
