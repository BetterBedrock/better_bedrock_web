import { BedrockText } from "@/shared/ui/bedrock-text";
import { Button } from "@/shared/ui/button";
import { Link } from "@/shared/ui/link";
import { Routes } from "@/shared/lib/utils";

import styles from "./projects-card.module.scss";

import PreviousIcon from "@/public/images/w_left_arrow.png";
import Image from "next/image";
import clsx from "clsx";

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
    <Button type="white" width="100%" center className={styles.button}>
      <div className={styles.items}>
        <Image
          height={31}
          width={31}
          src={PreviousIcon.src}
          className={clsx(styles.icon, styles.dark)}
          alt="Previous Page Icon"
          unoptimized
        />
        <BedrockText text="Previous Page" type="p" color="black" />
      </div>
    </Button>
  </Link>
);
