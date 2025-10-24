import { ButtonGroup } from "~/components/button-group/button-group";
import { useParams } from "react-router-dom";
import { useAuth } from "~/providers/auth";

import { styles, TabsButton } from ".";

export const Tabs = () => {
  const { user } = useAuth();
  const { id } = useParams();

  if (user?.name !== id && !user?.admin) {
    return <></>;
  }

  return (
    <ButtonGroup className={styles.tabs}>
      <TabsButton text="Projects" />
      <TabsButton text="Stats" />
      <TabsButton text="Drafts" />
    </ButtonGroup>
  );
};
