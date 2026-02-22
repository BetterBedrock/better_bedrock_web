import { BedrockText } from "@/shared/ui/bedrock-text";
import { Button } from "@/shared/ui/button";
import { Link } from "@/shared/ui/link";
import { Routes } from "@/shared/lib/utils";

import styles from "./projects-card.module.scss";

interface ProjectsCardPagePrevButtonProps {
  currentPage: number;
}

export const ProjectsCardPagePrevButton = ({
  currentPage,
}: ProjectsCardPagePrevButtonProps) => (
  <Link
    link={Routes.DOWNLOADS_BEDROCK_MODS + "/page/" + (currentPage - 1)}
    hideStyles
    className={styles.action}
  >
    <Button type="white" width="100%" center>
      <BedrockText text="Previous Page" type="p" color="black" />
    </Button>
  </Link>
);
