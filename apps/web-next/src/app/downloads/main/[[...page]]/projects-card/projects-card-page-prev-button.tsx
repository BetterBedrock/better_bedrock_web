import { BedrockText } from "@/_components/bedrock-text";
import { Button } from "@/_components/button";
import { Link } from "@/_components/link";
import { Routes } from "@/utils/routes";

import { styles } from ".";

interface ProjectsCardPagePrevButtonProps {
  currentPage: number;
}

export const ProjectsCardPagePrevButton = ({
  currentPage,
}: ProjectsCardPagePrevButtonProps) => (
  <Link
    link={Routes.DOWNLOADS_MAIN + "/page/" + (currentPage - 1)}
    hideStyles
    className={styles.action}
  >
    <Button type="white" width="100%" center>
      <BedrockText text="Previous Page" type="p" color="black" />
    </Button>
  </Link>
);
