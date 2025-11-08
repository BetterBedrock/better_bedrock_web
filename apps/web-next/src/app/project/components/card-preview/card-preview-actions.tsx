import { ButtonGroup } from "~/components/button-group/button-group";

import { CardPreviewActionsDecline, CardPreviewActionsPublish, styles } from ".";

export const CardPreviewActions = () => (
  <div className={styles.editor}>
    <ButtonGroup>
      <CardPreviewActionsPublish />
      <CardPreviewActionsDecline />
    </ButtonGroup>
  </div>
);
