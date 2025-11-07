import { BedrockText } from "@/_components/bedrock-text";
import { Button } from "@/_components/button";
import { Link } from "@/_components/link";
import { Routes } from "@/utils/routes";

import { styles } from ".";

interface ProjectsCardPageNextButtonProps {
  currentPage: number;
}

export const ProjectsCardPageNextButton = ({
  currentPage,
}: ProjectsCardPageNextButtonProps) => (
  <Link
    link={Routes.DOWNLOADS_MAIN + "/page/" + (currentPage + 1)}
    hideStyles
    className={styles.action}
  >
    <Button type="green" width="100%" center>
      <BedrockText text="Next Page" type="p" color="white" />
    </Button>
  </Link>
);
