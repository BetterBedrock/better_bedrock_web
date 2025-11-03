"use server";

import { ButtonGroup } from "@/_components/button-group/button-group";

import { styles, TabsButton } from ".";
import { fetchLoggedUser } from "@/_lib/auth/fetch-logged-user";

interface TabsProps {
  params?: { name: string };
}

export const Tabs = async ({ params }: TabsProps) => {
  const user = await fetchLoggedUser();
  const name = params?.name;

  if (user?.name !== name && !user?.admin) {
    return null;
  }

  return (
    <ButtonGroup className={styles.tabs}>
      <TabsButton name={name} text="Projects" />
      <TabsButton name={name} text="Stats" />
      <TabsButton name={name} text="Drafts" />
    </ButtonGroup>
  );
};
