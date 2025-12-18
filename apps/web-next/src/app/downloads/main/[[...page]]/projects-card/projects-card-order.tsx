"use client";

import { ButtonGroup } from "@/_components/button-group/button-group";
import { Collapsible } from "@/_components/collapsible";
import { SearchOrder } from "@/_lib/api";
import { ProjectsCardOrderButton } from "./projects-card-order-button";
import { useProjectsCardSearch } from "./providers/projects-card-search";
import styles from "./projects-card.module.scss";

export const ProjectsCardOrder = () => {
  const { selectedOrder } = useProjectsCardSearch();

  return (
    <Collapsible
      headerText={selectedOrder}
      contentText=""
      floating
      className={styles.collapsible}
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
