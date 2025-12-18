"use client";

import { BedrockText } from "@/_components/bedrock-text";
import { Button } from "@/_components/button";
import { Link } from "@/_components/link";
import { Routes } from "@/utils/routes";
import { usePathname } from "next/navigation";

import styles from "./tabs.module.scss";

interface TabsButtonProps {
  text: string;
  name?: string;
}

export const TabsButton = ({ text, name }: TabsButtonProps) => {
  const currentPage = usePathname().split("/").pop();
  
  return (
    <Link
      link={`${Routes.PROFILE}/${name}/${text.toLowerCase()}`}
      hideStyles
      className={styles.tab}
    >
      <Button
        width="100%"
        type="dark"
        center
        isClicked={currentPage === text.toLowerCase()}
      >
        <BedrockText
          text={text}
          color="white"
          type="h2"
          font="Mojangles"
          paragraphSize
        />
      </Button>
    </Link>
  );
};
