"use client";

import { useState } from "react";
import { BedrockText } from "@/shared/ui/bedrock-text";
import { Button } from "@/shared/ui/button";
import { ButtonGroup } from "@/shared/ui/button-group";
import { Input } from "@/shared/ui/input";

import { createProject } from "@/entities/project";
import styles from "./hero.module.scss";
import { useNotification } from "@/app/providers/notification";
import { useRouter } from "next/navigation";
import { Routes } from "@/shared/lib/utils";

export const HeroActions = () => {
  const { throwError } = useNotification();
  const router = useRouter();
  const [title, setTitle] = useState("");

  const handleCreateProject = async () => {
    const { data, error } = await createProject(title);
    if (error) {
      throwError(null, error);
    }
    if (!data) return;
    router.push(Routes.PROJECT_EDIT + "/" + data.id);
  };

  return (
    <ButtonGroup className={styles.actions}>
      <Input
        placeholder="Project Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={styles.input}
      />
      <Button onClick={handleCreateProject} center>
        <BedrockText text="Create" type="p" color="white" />
      </Button>
    </ButtonGroup>
  );
};
