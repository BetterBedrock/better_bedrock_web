import clsx from "clsx";
import { Banner } from "~/components/bedrock/banner";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Button } from "~/components/bedrock/button";
import { Input } from "~/components/bedrock/input";
import { Tag } from "~/components/bedrock/tag";
import { ButtonGroup } from "~/components/button-group/button-group";

import { styles, useDetailsEditorTags } from ".";

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
