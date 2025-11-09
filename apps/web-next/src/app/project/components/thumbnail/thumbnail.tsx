import { SubmittedOverlay } from "../submitted-overlay";

import { styles, ThumbnailPlaceholder } from ".";
import { Card, CardDivider } from "@/_components/card";
import { HeaderTitle } from "@/app/project/components/header";
import { DetailedProjectDto } from "@/_lib/api";

interface ThumbnailProps {
  detailedProject: DetailedProjectDto;
}

export const Thumbnail = ({ detailedProject }: ThumbnailProps) => {
  return (
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
};
