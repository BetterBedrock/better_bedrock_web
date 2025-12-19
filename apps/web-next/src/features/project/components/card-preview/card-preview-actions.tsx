import { ButtonGroup } from "@/components/button-group/button-group";
import { CardPreviewActionsDecline } from "@/features/project/components/card-preview/card-preview-actions-decline";
import { CardPreviewActionsPublish } from "@/features/project/components/card-preview/card-preview-actions-publish";

import styles from "./card-preview.module.scss";

export const CardPreviewActions = () => (
  <div className={styles.editor}>
    <ButtonGroup>
      <CardPreviewActionsPublish />
      <CardPreviewActionsDecline />
    </ButtonGroup>
  </div>
);
