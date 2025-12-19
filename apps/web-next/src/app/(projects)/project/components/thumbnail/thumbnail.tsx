import { ThumbnailPlaceholder } from "./thumbnail-placeholder";
import { Card, CardDivider } from "@/components/card";
import { DetailedProjectDto } from "@/lib/api";

import styles from "./thumbnail.module.scss";
import { HeaderTitle } from "@/app/(projects)/project/components/header/header-title";
import { SubmittedOverlay } from "@/app/(projects)/project/components/submitted-overlay/submitted-overlay";

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
