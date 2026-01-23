"use client";

import { useState } from "react";
import { BedrockText } from "@/shared/ui/bedrock-text";
import { Button } from "@/shared/ui/button";
import { ButtonGroup } from "@/shared/ui/button-group";
import { Input } from "@/shared/ui/input";

import { handleCreateProject } from "@/entities/project";
import styles from "./hero.module.scss";

export const HeroActions = () => {
  const [title, setTitle] = useState("");

  const createProject = async () => {
    await handleCreateProject(title);
  };

  return (
    <ButtonGroup className={styles.actions}>
      <Input
        placeholder="Project Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={styles.input}
      />
      <Button onClick={createProject} center>
        <BedrockText text="Create" type="p" color="white" />
      </Button>
    </ButtonGroup>
  );
};
