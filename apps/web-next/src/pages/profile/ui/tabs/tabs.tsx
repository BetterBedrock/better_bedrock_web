"use server";

import { ButtonGroup } from "@/shared/ui/button-group";
import { TabsButton } from "./tabs-button";
import { fetchLoggedUser } from "@/entities/auth";

import styles from "./tabs.module.scss";

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
