import { Card } from "@/shared/ui/card";

import styles from "./mod-card-thumbnail.module.scss";
import { ModCardThumbnailImage } from "@/shared/ui/mod-card/mod-card-thumbnail/mod-card-thumbnail-image";

interface ModCardThumbnailProps {
  src: string;
}

export const ModCardThumbnail = ({ src }: ModCardThumbnailProps) => (
  <Card negativeMarginBottom>
    <Card.Body className={styles.image}>
      <ModCardThumbnailImage src={src}/>
    </Card.Body>
  </Card>
);
