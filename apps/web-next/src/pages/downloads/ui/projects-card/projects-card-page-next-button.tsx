import { BedrockText } from "@/shared/ui/bedrock-text";
import { Button } from "@/shared/ui/button";
import { Link } from "@/shared/ui/link";
import { Routes } from "@/shared/lib/utils";

import styles from "./projects-card.module.scss";

interface ProjectsCardPageNextButtonProps {
  currentPage: number;
}

export const ProjectsCardPageNextButton = ({
  currentPage,
}: ProjectsCardPageNextButtonProps) => (
  <Link
    link={Routes.DOWNLOADS_BEDROCK_MODS + "/page/" + (currentPage + 1)}
    hideStyles
    className={styles.action}
  >
    <Button type="green" width="100%" center>
      <BedrockText text="Next Page" type="p" color="white" />
    </Button>
  </Link>
);
