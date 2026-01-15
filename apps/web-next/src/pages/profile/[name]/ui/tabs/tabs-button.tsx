"use client";

import { BedrockText } from "@/shared/ui/bedrock-text";
import { Button } from "@/shared/ui/button";
import { Link } from "@/shared/ui/link";
import { Routes } from "@/shared/model/routes";
import { usePathname } from "next/navigation";

import styles from "./tabs.module.scss";

interface TabsButtonProps {
  text: string;
  name?: string;
}

export const TabsButton = ({ text, name }: TabsButtonProps) => {
  const currentPage = usePathname()?.split("/").pop();

  return (
    <Link
      link={`${Routes.PROFILE}/${name}/${text.toLowerCase()}`}
      hideStyles
      className={styles.tab}
    >
      <Button
        width="100%"
        type="white"
        center
        isClicked={currentPage === text.toLowerCase()}
      >
        <BedrockText
          text={text}
          color="black"
          type="h2"
          font="Mojangles"
          paragraphSize
        />
      </Button>
    </Link>
  );
};
