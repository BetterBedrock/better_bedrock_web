import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CircularProgressIndicator } from "~/components/bedrock/circular-progress-indicator";
// import { Routes } from "~/utils/routes";
import { styles, HeroTitle, HeroAction } from ".";

// import { PreviewPopup } from "./preview-popup";
import { Card, CardDivider } from "~/components/bedrock/card";
import { Rating } from "~/components/rating";
import Steve from "~/assets/images/avatars/Steve.png";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Link } from "~/components/link";
import { SimpleEditor } from "~/components/tiptap-templates/simple/simple-editor";
import { useProject } from "~/providers/project";
import { ProjectDto, SimpleUserDto, UpdateProjectDto } from "~/lib/api";
import { HeroSave } from "~/pages/preview/components/hero/hero-save";
import { Collapsible } from "~/components/bedrock/collapsible";
import { Button } from "~/components/bedrock/button";
import { useNotification } from "~/providers/notification";
import { Tag } from "~/components/bedrock/tag";
import { Input } from "~/components/bedrock/input";
import clsx from "clsx";
import { ImagePlaceholder } from "~/components/image-placeholder";
import { baseUrl } from "~/utils/url";
import { Content } from "@tiptap/react";
import { useUser } from "~/providers/user";
import { Routes } from "~/utils/routes";
import { PreviewMode } from "~/pages/preview";

interface HeroProps {
  mode: PreviewMode;
}

export const Hero = ({ mode }: HeroProps) => {
  const [_, setShowPopup] = useState(false);
  // const navigate = useNavigate();
  const { sendNotification } = useNotification();
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const uploadFileRef = useRef<HTMLInputElement | null>(null);
  const [tagInput, setTagInput] = useState("");

  const navigate = useNavigate();
  const { file } = useParams();
  const {
    fetchDraftDetails,
    fetchProjectDetails,
    saveProject,
    cancelSubmission,
    submitProject,
    uploadFile,
    deleteProject,
  } = useProject();

  const [draftProject, setDraftProject] = useState<ProjectDto | undefined>();
  const [project, setProject] = useState<ProjectDto | undefined>();
  const [creator, setCreator] = useState<SimpleUserDto | undefined>();

  const { findUserById } = useUser();

  const editorContent = useRef<Content | undefined>(draftProject?.description);

  const fetched = draftProject || project;
  const selectedProject = draftProject ?? project;

  useEffect(() => {
    if (file) {
      if (mode !== "view") {
        fetchDraftDetails(file).then((data) => {
          setDraftProject(data);
          editorContent.current = data?.description;
        });
      } else {
        fetchProjectDetails(file).then((data) => {
          setProject(data);
          editorContent.current = data?.description;
        });
      }
    }
  }, [file]);

  useEffect(() => {
    if (!selectedProject || !selectedProject.userId) return;
    findUserById(selectedProject.userId).then((data) => setCreator(data));
  }, [draftProject, project]);

  if (!fetched) {
    return <CircularProgressIndicator size="large" />;
  }

  // if ((!create && (!downloads || !download)) || !download) {
  //   navigate(Routes.DOWNLOADS);
  //   return null;
  // }

  // if (create && (!id || !draftProject)) {
  //   return <CircularProgressIndicator size="large" />;
  // }

  const scrollToButton = () => {
    buttonRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const uploadDownloadFile = async (file: File | undefined) => {
    if (!selectedProject || !file) return;
    await uploadFile(selectedProject!.id, file);
    const newProject = await fetchDraftDetails(selectedProject.id);
    setDraftProject((prev) => ({
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

  const handleUploadThumbnail = async (file: File) => {
    if (!selectedProject) return;
    const uploadedFile = await uploadFile(selectedProject.id, file);
    if (!uploadedFile) return;
    const newDraftProject = { ...selectedProject, thumbnail: uploadedFile.fileUrl };
    setDraftProject(newDraftProject);

    await handleSaveProject(newDraftProject);

    // await saveProject(draftProject.id, newDraftProject);
  };

  const handleSaveProject = async (newDraftProject: UpdateProjectDto) => {
    if (!selectedProject) return;

    newDraftProject.description =
      typeof editorContent.current === "object" && editorContent.current !== null
        ? editorContent.current
        : {};

    await saveProject(selectedProject.id, newDraftProject);
  };

  const handleSubmission = async () => {
    if (!selectedProject) return;

    if (!selectedProject.submitted) {
      await handleSaveProject(selectedProject);
      setDraftProject(await submitProject(selectedProject.id));
    } else {
      setDraftProject(await cancelSubmission(selectedProject.id));
    }
  };

  const handleDelete = async () => {
    if (!selectedProject) return;

    console.log({ selectedProject });

    await deleteProject(selectedProject.id);
    sendNotification({
      title: "Deleted",
      label: "Successfully deleted project",
      type: "success",
    });

    navigate(Routes.HOME);
  };

  return (
    <div className={styles.preview}>
      {/* {showPopup && <PreviewPopup onClose={() => setShowPopup(false)} downloadItem={download} />} */}
      <Card className={styles.card}>
        <Card sub className={styles.information}>
          {/* <HeroDescription download={download} /> */}
          <div className={clsx(styles.editor)}>
            <HeroTitle title={selectedProject?.title ?? ""} />
            {mode === "view" && <Rating rating={4.2} />}
          </div>

          <CardDivider />

          <div className={clsx(styles.editor)}>
            <div className={styles.header}>
              <img src={Steve} className={styles.avatar} />

              {/* Renders the description, which can now be any React node */}
              <div>
                {creator ? (
                  <BedrockText text={`@${creator?.name}`} type="p" color="white" />
                ) : (
                  <CircularProgressIndicator size="small" />
                )}
                <Rating simple rating={2.5} />
              </div>
            </div>
          </div>

          {mode === "view" && (
            <Link link="#download" onClick={scrollToButton}>
              <BedrockText
                text="Skip to download"
                type="p"
                color="white"
                extraClassName={styles.skip}
              />
            </Link>
          )}
        </Card>
        {mode === "edit" && (
          <Card sub className={styles.information}>
            <div className={clsx(styles.editor)}>
              <HeroTitle title="Details" />
            </div>

            <CardDivider />
            <div className={clsx(styles.editor)}>
              <Collapsible width="100%" headerText="Project Type" contentText="" floating>
                <Button type="dark" center>
                  <BedrockText text="Texture Pack" type="p" color="white" />
                </Button>
              </Collapsible>
            </div>

            <CardDivider />
            <div className={clsx(styles.editor, styles.tagsWrapper)}>
              <div className={styles.creator}>
                <Input
                  className={styles.input}
                  placeholder="Tag Name"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                />
                <Button
                  onClick={() =>
                    setDraftProject((prev) => ({
                      ...prev!,
                      tags: prev?.tags
                        ? Array.from(new Set([...prev.tags, tagInput]).values())
                        : [tagInput],
                    }))
                  }
                  center
                >
                  <BedrockText text="Create" type="p" color="white" />
                </Button>
              </div>
              <div className={styles.tags}>
                {selectedProject?.tags.map((tag) => (
                  <Tag border={"all"} name={tag} deletable />
                ))}
              </div>
            </div>

            <CardDivider />
            <div className={clsx(styles.editor)}>
              <BedrockText
                text={
                  selectedProject?.downloadFile
                    ? `Selected File : ${selectedProject.itemWeight}MB`
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
                className={styles.action}
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
        )}
      </Card>

      <Card className={styles.card}>
        {mode === "edit" ? (
          <>
            <Card sub>
              <div className={styles.editor}>
                <HeroTitle title="Thumbnail" />

                <ImagePlaceholder
                  onUpload={handleUploadThumbnail}
                  src={
                    selectedProject?.thumbnail
                      ? baseUrl + "/" + selectedProject!.thumbnail
                      : undefined
                  }
                />
              </div>
            </Card>
            <Card sub>
              <div className={styles.editor}>
                <HeroTitle title="Description" />
                <SimpleEditor
                  editable={true}
                  content={selectedProject?.description}
                  onChange={(data) => (editorContent.current = data)}
                />
              </div>
            </Card>
          </>
        ) : (
          <>
            <Card sub>
              <div className={styles.editor}>
                <HeroTitle title="Description" />
                <SimpleEditor
                  editable={false}
                  content={selectedProject?.description}
                  onChange={(data) => (editorContent.current = data)}
                />
              </div>
            </Card>
          </>
        )}
      </Card>

      <div>
        {/* <HeroTitle download={download} /> */}
        {/* <HeroDescription download={download} /> */}
        {mode === "edit" ? (
          <>
            <HeroSave onClick={async () => await handleSaveProject(selectedProject!)} />
            <Button
              className={styles.action}
              width="100%"
              type="dark"
              onClick={handleSubmission}
              center
            >
              <BedrockText
                text={selectedProject?.submitted ? "Unsubmit project" : "Submit for review"}
                type="p"
                color="white"
              />
            </Button>

            <Button className={styles.action} width="100%" type="red" center onClick={handleDelete}>
              <BedrockText text={"Delete Project"} type="p" color="white" />
            </Button>
          </>
        ) : (
          <HeroAction ref={buttonRef} setShowPopup={setShowPopup} />
        )}

        {mode === "review" && (
          <>
            <Button
              className={styles.action}
              width="100%"
              type="gold"
              center
              onClick={handleDelete}
            >
              <BedrockText text="Publish" type="p" color="white" />
            </Button>
            <Button className={styles.action} width="100%" type="red" center>
              <BedrockText text="Decline Project" type="p" color="white" />
            </Button>

            <Button className={styles.action} width="100%" type="red" center onClick={handleDelete}>
              <BedrockText text="Delete Project" type="p" color="white" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
