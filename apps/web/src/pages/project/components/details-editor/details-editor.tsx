import clsx from "clsx";
import { useRef } from "react";
import { PROJECT_TYPES } from "~/assets/content/better-bedrock";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Button } from "~/components/bedrock/button";
import { Card, CardDivider } from "~/components/bedrock/card";
import { Input } from "~/components/bedrock/input";
import { Tag } from "~/components/bedrock/tag";
import { ButtonGroup } from "~/components/button-group/button-group";
import { styles } from ".";
import { ProjectType } from "~/lib/api";
import { HeaderTitle } from "~/pages/project/components/header";
import { useProjectManager } from "~/pages/project/providers/project-manager";
import { useNotification } from "~/providers/notification";
import { useProject } from "~/providers/project";

export const DetailsEditor = () => {
  const tagInputRef = useRef<HTMLInputElement>(null);
  const uploadFileRef = useRef<HTMLInputElement>(null);

  const { sendNotification } = useNotification();
  const { uploadFile } = useProject();
  const { selectedProject, setSelectedProject, fetchSelectedProject } = useProjectManager();
  if (!selectedProject) return;

  const uploadDownloadFile = async (file: File | undefined) => {
    if (!selectedProject || !file) return;
    await uploadFile(selectedProject!.id, file);
    const newProject = await fetchSelectedProject(selectedProject.id, false);
    setSelectedProject((prev) => ({
      ...prev!,
      downloadFile: newProject!.downloadFile,
      itemWeight: newProject!.itemWeight,
    }));

    sendNotification({
      title: "Uploaded",
      label: "Successfully uploaded download file",
      type: "success",
    });
  };

  return (
    <>
      <Card sub className={styles.information}>
        <div className={clsx(styles.editor)}>
          <HeaderTitle title="Details" />
        </div>

        <CardDivider sub />
        <div className={clsx(styles.editor, styles.size)}>
          <BedrockText text="Project Type" type="p" color="white" textAlign="left" />

          <ButtonGroup>
            {Object.entries(PROJECT_TYPES).map(([key, label]) => (
              <Button
                key={key}
                // transparent
                // toggled
                type={key === selectedProject.type ? "green" : "white"}
                onClick={() =>
                  setSelectedProject((prev) => ({ ...prev!, type: key as ProjectType }))
                }
                isClicked={key === selectedProject.type}
                isToggled={key === selectedProject.type}
                center
              >
                <BedrockText
                  text={label}
                  color={key === selectedProject.type ? "white" : "black"}
                  type="p"
                />
              </Button>
            ))}
          </ButtonGroup>
        </div>

        <CardDivider sub />
        <div className={clsx(styles.editor, styles.size)}>
          <BedrockText text="Tags" type="p" color="white" textAlign="left" />
          <ButtonGroup className={styles.creator}>
            <Input className={styles.input} placeholder="Tag Name" ref={tagInputRef} />
            <Button
              onClick={() => {
                setSelectedProject((prev) => ({
                  ...prev!,
                  tags: [...(prev?.tags ?? []), { name: tagInputRef.current?.value ?? "" }],
                }));
              }}
              center
            >
              <BedrockText text="Create" type="p" color="white" />
            </Button>
          </ButtonGroup>
          <div className={styles.tags}>
            {(selectedProject?.tags ?? []).map((tag) => (
              <Tag
                border={"all"}
                name={tag.name}
                deletable
                onDelete={() => {
                  setSelectedProject((prev) => ({
                    ...prev!,
                    tags: prev?.tags.filter((existingTag) => existingTag.name !== tag.name) ?? [],
                  }));
                }}
              />
            ))}
          </div>
        </div>

        <CardDivider sub />
        <div className={clsx(styles.editor, styles.size)}>
          <BedrockText
            text={
              selectedProject?.downloadFile
                ? `Selected File Size: ${selectedProject.itemWeight}MB`
                : "No selected file yet"
            }
            type="p"
            color="white"
            textAlign="left"
          />
          <input
            className={styles.picker}
            ref={uploadFileRef}
            type="file"
            onChange={(e) => uploadDownloadFile(e.target.files?.[0])}
          />
          <Button
            width="100%"
            type={selectedProject?.downloadFile ? "green" : "dark"}
            onClick={() => {
              uploadFileRef.current?.click();
            }}
            center
          >
            <BedrockText text="Upload Download File" type="p" color="white" />
          </Button>
        </div>
      </Card>
    </>
  );
};
