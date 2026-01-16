"use client";

import { ButtonGroup } from "@/components/button-group/button-group";
import { Collapsible } from "@/components/collapsible";
import { SearchOrder } from "@/lib/api";
import { ProjectsCardOrderButton } from "./projects-card-order-button";
import { useProjectsCardSearch } from "../../providers/projects-card-search";
import styles from "./projects-card.module.scss";
import { clsx } from "clsx";

export const ProjectsCardOrder = ({ className }: { className?: string }) => {
  const { selectedOrder } = useProjectsCardSearch();

  return (
    <Collapsible
      headerText={selectedOrder}
      contentText=""
      floating
      className={clsx(styles.collapsible, className)}
      limit={true}
    >
      <ButtonGroup direction="vertical">
        {Object.values(SearchOrder).map((type, index) => (
          <ProjectsCardOrderButton key={index} type={type} />
        ))}
      </ButtonGroup>
    </Collapsible>
  );
};
