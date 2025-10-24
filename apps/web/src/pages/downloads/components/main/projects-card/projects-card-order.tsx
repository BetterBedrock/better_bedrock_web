import { Collapsible } from "~/components/bedrock/collapsible";
import { ButtonGroup } from "~/components/button-group/button-group";
import { SearchOrder } from "~/lib/api";

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
