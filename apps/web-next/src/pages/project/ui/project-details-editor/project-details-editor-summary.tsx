"use client";

import { BedrockText } from "@/shared/ui/bedrock-text";
import { Input } from "@/shared/ui/input";

import styles from "./project-details-editor.module.scss";
import { Card } from "@/shared/ui/card";
import { useDetailsEditorSummary } from "@/pages/project/model/use-details-editor-summary";

export const ProjectDetailsSummary = () => {
  const { summary, setSummary } = useDetailsEditorSummary();

  return (
    <Card.Item>
      <BedrockText
        text="Summary of the project"
        type="p"
        color="white"
        textAlign="left"
      />
      <Input
        sub
        className={styles.input}
        placeholder="Briefly describe what your project adds or changes..."
        maxLength={120}
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
    </Card.Item>
  );
};
