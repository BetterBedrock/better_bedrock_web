import { BedrockText } from "@/shared/ui/bedrock-text";
import { Button } from "@/shared/ui/button";
import { Link } from "@/shared/ui/link";
import { Routes } from "@/shared/lib/utils";

import styles from "./projects-card.module.scss";

import NextIcon from "@/public/images/w_right_arrow.png";
import Image from "next/image";

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
    <Button type="green" width="100%" center className={styles.button}>
      <div className={styles.items}>
        <BedrockText text="Next Page" type="p" color="white" />
        <Image
          height={31}
          width={31}
          src={NextIcon.src}
          className={styles.icon}
          alt="Previous Page Icon"
          unoptimized
        />
      </div>
    </Button>
  </Link>
);
