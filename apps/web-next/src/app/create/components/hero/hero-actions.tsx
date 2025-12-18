"use client";

import { useState } from "react";
import { BedrockText } from "@/_components/bedrock-text";
import { Button } from "@/_components/button";
import { ButtonGroup } from "@/_components/button-group/button-group";
import { Input } from "@/_components/input";

import { handleCreateProject } from "./server/handle-create-project";
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
