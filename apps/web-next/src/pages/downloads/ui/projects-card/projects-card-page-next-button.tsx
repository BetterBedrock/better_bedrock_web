"use client";

import { BedrockText } from "@/shared/ui/bedrock-text";
import { Button } from "@/shared/ui/button";
import NextIcon from "@/public/images/w_right_arrow.png";
import Image from "next/image";
import { Link } from "@/shared/ui/link";
import { useSetSearchParams } from "@/pages/downloads/model/use-set-search-params";

import styles from "./projects-card.module.scss";

interface ProjectsCardPageNextButtonProps {
  currentPage: number;
}

export const ProjectsCardPageNextButton = ({
  currentPage,
}: ProjectsCardPageNextButtonProps) => {
  const href = useSetSearchParams("page", (currentPage + 1).toString());

  return (
    <Link link={href} hideStyles className={styles.action}>
      <Button type="green" width="100%" center className={styles.button}>
        <div className={styles.items}>
          <BedrockText text="Next Page" type="p" color="white" />
          <Image
            height={31}
            width={31}
            src={NextIcon.src}
            className={styles.icon}
            alt="Next Page Icon"
            unoptimized
          />
        </div>
      </Button>
    </Link>
  );
};
