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
import { ProjectType, TagNameDto } from "~/lib/api";
import { HeaderTitle } from "~/pages/project/components/header";
import { useProjectManager } from "~/pages/project/providers/project-manager";
import { useNotification } from "~/providers/notification";
import { useProject } from "~/providers/project";
import { useAuth } from "~/providers/auth";
import { InputSwitch } from "~/components/bedrock/input/input-switch";
import { calcItemWeight } from "~/pages/downloads/components/better-bedrock";
import { Collapsible } from "~/components/bedrock/collapsible";

export const DetailsEditor = () => {
  const tagInputRef = useRef<HTMLInputElement>(null);
  const uploadFileRef = useRef<HTMLInputElement>(null);

  const { user } = useAuth();
  const { sendNotification, throwError } = useNotification();
  const { uploadFile } = useProject();
  const { selectedProject, setSelectedProject, fetchSelectedProject, handleSaveProject } =
    useProjectManager();
  if (!selectedProject) return;

  const uploadDownloadFile = async (file: File | undefined) => {
    if (!selectedProject || !file) return;
    const uploadedFile = await uploadFile(selectedProject!.id, file);
    if (!uploadedFile) return;

    const newProject = await fetchSelectedProject(selectedProject.id, true);
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

    await handleSaveProject(selectedProject);
  };

  const handleCreateTag = async () => {
    const tagName = tagInputRef.current?.value.trim();

    if (selectedProject.tags.find((t) => t.name === tagName)) {
      throwError(null, "Tag with this name is already attached to this project");
      return;
    }

    if (!tagName) return;
    const newSelectedProject = {
      ...selectedProject!,
      tags: [...(selectedProject?.tags ?? []), { name: tagName }],
    };

    const updateProject = await handleSaveProject(newSelectedProject);

    if (!updateProject) {
      return;
    }

    setSelectedProject(newSelectedProject);

    if (!tagInputRef.current) return;
    tagInputRef.current.value = "";
  };

  const handleDeleteTag = async (tag: TagNameDto) => {
    const newProject = {
      ...selectedProject!,
      tags: selectedProject?.tags.filter((existingTag) => existingTag.name !== tag.name) ?? [],
    };
    setSelectedProject(newProject);
    await handleSaveProject(newProject);
  };

  const handleUpdateType = async (key: string) => {
    const newProject = { ...selectedProject!, type: key as ProjectType };
    setSelectedProject(newProject);
    await handleSaveProject(newProject);
  };

  const handleSwitchBetterBedrock = async () => {
    const newProject = {
      ...selectedProject!,
      betterBedrockContent: !selectedProject?.betterBedrockContent,
    };
    setSelectedProject(newProject);
    await handleSaveProject(newProject);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleCreateTag();
    }
  };

  const types = Object.entries(PROJECT_TYPES).map(([key, label]) => (
    <Button
      key={key}
      type={key === selectedProject.type ? "green" : "white"}
      onClick={async () => await handleUpdateType(key)}
      isClicked={key === selectedProject.type}
      isToggled={key === selectedProject.type}
      center
    >
      <BedrockText text={label} color={key === selectedProject.type ? "white" : "black"} type="p" />
    </Button>
  ));

  return (
    <>
      <Card sub className={styles.information}>
        <div className={clsx(styles.editor)}>
          <HeaderTitle title="Details" />
        </div>

        <CardDivider sub />
        <div className={clsx(styles.editor, styles.size)}>
          <BedrockText text="Project Type" type="p" color="white" textAlign="left" />

          <Collapsible
            headerText={PROJECT_TYPES[selectedProject.type as ProjectType]}
            contentText=""
            floating
            className={styles.types}
            limit={true}
            type="green"
          >
            <ButtonGroup direction="vertical">{types}</ButtonGroup>
          </Collapsible>

          <ButtonGroup direction="horizontal" className={styles.group}>
            {types}
          </ButtonGroup>
        </div>

        <CardDivider sub />
        <div className={clsx(styles.editor, styles.size)}>
          <BedrockText text="Tags" type="p" color="white" textAlign="left" />
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

        {user?.admin && (
          <>
            <CardDivider sub />
            <div className={clsx(styles.editor, styles.size)}>
              <BedrockText text="Better Bedrock Content" type="p" color="white" textAlign="left" />

              <InputSwitch
                placeholder="Better Bedrock Content"
                checked={selectedProject.betterBedrockContent}
                onChange={handleSwitchBetterBedrock}
              />
            </div>
          </>
        )}

        <CardDivider sub />
        <div className={clsx(styles.editor, styles.size)}>
          <BedrockText
            text={
              selectedProject?.downloadFile
                ? `Selected File Size: ${calcItemWeight(selectedProject.itemWeight)}MB`
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
