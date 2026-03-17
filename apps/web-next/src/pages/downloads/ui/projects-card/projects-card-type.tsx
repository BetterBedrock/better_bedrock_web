"use client";

import { ButtonGroup } from "@/shared/ui/button-group";
import { Collapsible } from "@/shared/ui/collapsible";
import { ProjectsCardTypeButton } from "./projects-card-type-button";

import { SEARCH_PROJECT_TYPES, SearchProjectTypeKey } from "@/shared/config";
import { useProjectsCardSearch } from "@/pages/downloads/model/projects-card-search";

import styles from "./projects-card.module.scss";

export const ProjectsCardType = ({
  onOpenChange,
  open,
}: {
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
}) => {
  const { selectedType } = useProjectsCardSearch();

  const types = Object.entries(SEARCH_PROJECT_TYPES).map(([key, label]) => (
    <ProjectsCardTypeButton key={key} selectedKey={key} label={label} />
  ));

  return (
    <>
      <Collapsible
        headerText={SEARCH_PROJECT_TYPES[selectedType as SearchProjectTypeKey]}
        contentText=""
        floating
        className={styles.types}
        limit={true}
        type="green"
        onOpenChange={onOpenChange}
        open={open}
      >
        <ButtonGroup direction="vertical">{types}</ButtonGroup>
      </Collapsible>
      <ButtonGroup direction="horizontal" className={styles.group}>
        {types}
      </ButtonGroup>
    </>
  );
};
