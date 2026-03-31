"use client";

import { ButtonGroup } from "@/shared/ui/button-group";
import { Collapsible } from "@/shared/ui/collapsible";
import { ProjectsCardTypeButton } from "./projects-card-type-button";

import styles from "./projects-card.module.scss";
import { bedrockDownloadPages } from "@/shared/config";
import { ProjectType } from "@/shared/lib/openapi";

interface ProjectsCardTypeProps {
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  defaultType?: ProjectType;
}

export const ProjectsCardType = ({
  onOpenChange,
  open,
  defaultType,
}: ProjectsCardTypeProps) => {
  const pageTypes = bedrockDownloadPages.flatMap((p) => p.details);

  const selectedPageType =
    pageTypes.find((p) => p.type === defaultType)?.clean ?? "All";

  const types = pageTypes.map((details) => (
    <ProjectsCardTypeButton
      key={details.type ?? "all"}
      selectedKey={details.type}
      label={details.clean}
      defaultType={defaultType}
    />
  ));

  return (
    <>
      <Collapsible
        headerText={selectedPageType}
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
