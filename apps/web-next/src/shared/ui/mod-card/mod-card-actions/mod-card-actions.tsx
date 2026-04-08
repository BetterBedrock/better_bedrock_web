import { ButtonGroup } from "@/shared/ui/button-group";
import { Card } from "@/shared/ui/card";
import { ModCardActionsToggle } from "@/shared/ui/mod-card/mod-card-actions/mod-card-actions-toggle";
import { ReactNode } from "react";
import { ModCardActionsSettings } from "@/shared/ui/mod-card/mod-card-actions/mod-card-actions-settings";

import styles from "./mod-card-actions.module.scss";

interface ModCardActionsToggleProps {
  defaultEnabled: boolean;
  onChange?: (enabled: boolean) => void;
  popup?: (close: () => void) => ReactNode;
}

export const ModCardActions = ({
  defaultEnabled,
  onChange,
  popup,
}: ModCardActionsToggleProps) => {
  return (
    <Card.Body className={styles.details}>
      <Card.Item>
        <ButtonGroup direction="horizontal">
          <ModCardActionsToggle
            defaultEnabled={defaultEnabled}
            onChange={onChange}
          />
          {popup && <ModCardActionsSettings popup={popup} />}
        </ButtonGroup>
      </Card.Item>
    </Card.Body>
  );
};
