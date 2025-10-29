import { SEARCH_PROJECT_TYPES } from "~/assets/content/better-bedrock";
import { Collapsible } from "~/components/bedrock/collapsible";
import { ButtonGroup } from "~/components/button-group/button-group";

import { ProjectsCardTypeButton, styles, useProjectsCardSearch } from ".";

export const ProjectsCardType = () => {
  const { selectedType } = useProjectsCardSearch();

  const types = Object.entries(SEARCH_PROJECT_TYPES).map(([key, label]) => (
    <ProjectsCardTypeButton selectedKey={key} label={label} />
  ));

  return (
    <>
      <Collapsible
        headerText={SEARCH_PROJECT_TYPES[selectedType]}
        contentText=""
        floating
        className={styles.types}
        limit={true}
        type="green"
      >
        <ButtonGroup direction="vertical">{types}</ButtonGroup>
      </Collapsible>
      <ButtonGroup direction="horizontal" className={styles.group}>
        {types}
      </ButtonGroup>
    </>
  );
};
