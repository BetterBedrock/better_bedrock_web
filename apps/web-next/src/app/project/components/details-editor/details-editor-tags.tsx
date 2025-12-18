"use client";

import clsx from "clsx";
import { Banner } from "@/_components/banner";
import { BedrockText } from "@/_components/bedrock-text";
import { Button } from "@/_components/button";
import { ButtonGroup } from "@/_components/button-group/button-group";
import { Input } from "@/_components/input";
import { Tag } from "@/_components/tag";
import { useDetailsEditorTags } from "@/app/project/components/details-editor/hooks/use-details-editor-tags";

import styles from "./details-editor.module.scss";

export const DetailsEditorTags = () => {
  const { handleCreateTag, tagInputRef, selectedProject, handleDeleteTag, handleKeyDown } =
    useDetailsEditorTags();

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
