"use client";

import { ButtonGroup } from "@/_components/button-group/button-group";
import { Collapsible } from "@/_components/collapsible";
import { SearchOrder } from "@/_lib/api";
import { styles, ProjectsCardOrderButton, useProjectsCardSearch } from ".";

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
