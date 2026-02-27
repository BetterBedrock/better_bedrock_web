"use client";

import { ButtonGroup } from "@/shared/ui/button-group";
import { Collapsible } from "@/shared/ui/collapsible";
import { SearchOrder } from "@/shared/lib/openapi";
import { ProjectsCardOrderButton } from "./projects-card-order-button";
import { useProjectsCardSearch } from "@/pages/downloads/model/projects-card-search";

import styles from "./projects-card.module.scss";
import { clsx } from "clsx";

export const ProjectsCardOrder = ({
  className,
  onOpenChange,
  closeTrigger,
}: {
  className?: string;
  onOpenChange?: (open: boolean) => void;
  closeTrigger?: number;
}) => {
  const { selectedOrder } = useProjectsCardSearch();

  return (
    <Collapsible
      headerText={selectedOrder}
      contentText=""
      floating
      className={clsx(styles.collapsible, className)}
      limit={true}
      onOpenChange={onOpenChange}
      closeTrigger={closeTrigger}
    >
      <ButtonGroup direction="vertical">
        {Object.values(SearchOrder).map((type, index) => (
          <ProjectsCardOrderButton key={index} type={type} />
        ))}
      </ButtonGroup>
    </Collapsible>
  );
};
