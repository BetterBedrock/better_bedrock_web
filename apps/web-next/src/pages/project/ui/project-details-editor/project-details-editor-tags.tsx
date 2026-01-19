"use client";

import clsx from "clsx";
import { Banner } from "@/shared/ui/banner";
import { BedrockText } from "@/shared/ui/bedrock-text";
import { Button } from "@/shared/ui/button";
import { ButtonGroup } from "@/shared/ui/button-group";
import { Input } from "@/shared/ui/input";
import { Tag } from "@/shared/ui/tag";
import { useDetailsEditorTags } from "@/pages/project/model/use-details-editor-tags";

import styles from "./project-details-editor.module.scss";

export const ProjectDetailsEditorTags = () => {
  const {
    handleCreateTag,
    tagInputRef,
    selectedProject,
    handleDeleteTag,
    handleKeyDown,
  } = useDetailsEditorTags();

  return (
    <div className={clsx(styles.editor, styles.size)}>
      <BedrockText text="Tags" type="p" color="white" textAlign="left" />
      {selectedProject!.tags.length >= 5 ? (
        <Banner
          type="neutral"
          message="You have reached the limit of tags, please remove older tags before creating new ones."
        />
      ) : (
        <ButtonGroup className={styles.creator}>
          <Input
            className={styles.input}
            placeholder="Tag Name"
            maxLength={15}
            ref={tagInputRef}
            onKeyDown={handleKeyDown}
          />
          <Button onClick={handleCreateTag} center>
            <BedrockText text="Create" type="p" color="white" />
          </Button>
        </ButtonGroup>
      )}
      <div className={styles.tags}>
        {(selectedProject?.tags ?? []).map((tag, index) => (
          <Tag
            key={tag.name + index}
            border="all"
            name={tag.name}
            deletable
            onDelete={() => handleDeleteTag(tag)}
          />
        ))}
      </div>
    </div>
  );
};
