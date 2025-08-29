import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CircularProgressIndicator } from "~/components/bedrock/circular-progress-indicator";
import { styles, HeroTitle, HeroAction } from ".";
import { Card, CardDivider } from "~/components/bedrock/card";
import { Rating } from "~/components/rating";
import Steve from "~/assets/images/avatars/Steve.png";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Link } from "~/components/link";
import { TextEditor } from "~/components/text-editor/text-editor";
import { useProject } from "~/providers/project";
import {
  ProjectCommentDto,
  ProjectDto,
  ProjectRatingDto,
  ProjectType,
  SimpleUserDto,
  UpdateProjectDto,
} from "~/lib/api";
import { HeroSave } from "~/pages/preview/components/hero/hero-save";
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
import { GridDownloadCard } from "~/components/bedrock/grid-download-card/grid-download-card";
import { PreviewPopup } from "~/pages/preview/components/hero/preview-popup";
import { Comment } from "~/components/comment";
import { PROJECT_TYPES } from "~/assets/content/better-bedrock";
import { ButtonGroup } from "~/components/button-group/button-group";

interface HeroProps {
  mode: PreviewMode;
}

export const Hero = ({ mode }: HeroProps) => {
  const [showPopup, setShowPopup] = useState(false);
  const { sendNotification, throwError } = useNotification();
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
    publish,
    getProjectRating,
    getComments,
    postComment,
    replyToComment,
    postRating,
    deleteRating,
  } = useProject();

  const [draftProject, setDraftProject] = useState<ProjectDto | undefined>();
  const [project, setProject] = useState<ProjectDto | undefined>();
  const [creator, setCreator] = useState<SimpleUserDto | undefined>();
  const [rating, setRating] = useState<ProjectRatingDto | undefined>(undefined);
  const [userRating, setUserRating] = useState<number | undefined>(undefined);
  const [comments, setComments] = useState<ProjectCommentDto[] | undefined>([]);
  const commentInputRef = useRef<HTMLInputElement>(null);

  const { findUserById, getUserRating } = useUser();

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
    if (selectedProject) {
      getProjectRating(selectedProject.id).then((data) => setRating(data));
      getComments(selectedProject.id).then((data) => setComments(data ?? []));
      getUserRating(selectedProject.id).then((data) => setUserRating(data));
    }
  }, [selectedProject]);

  useEffect(() => {
    if (!selectedProject || !selectedProject.userId) return;
    findUserById(selectedProject.userId).then((data) => setCreator(data));
  }, [draftProject, project]);

  if (!fetched) {
    return <CircularProgressIndicator size="large" />;
  }

  if (!selectedProject) {
    navigate(Routes.HOME);
    return null;
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

  const handlePostComment = async () => {
    if (!selectedProject) return;

    const content = commentInputRef.current?.value;

    if (!content || content === "") {
      throwError(null, "You need to provide a comment");
    }

    const comment = await postComment(selectedProject.id, content!);
    if (!comment) return;

    setComments((prev) => [...(prev ?? []), comment]);
  };

  const handlePostReply = async (reply: string, parentId: string) => {
    if (!selectedProject) return;

    if (!reply.trim()) {
      throwError(null, "You need to provide a comment");
      return;
    }

    const newReply = await replyToComment(selectedProject.id, parentId, reply);
    if (!newReply) return;

    setComments((prev) =>
      (prev ?? []).map((comment) =>
        comment.id === parentId
          ? {
              ...comment,
              replies: [...(comment.replies ?? []), newReply], // immutably add reply
            }
          : comment,
      ),
    );
  };

  const handlePostRating = async (rating: number) => {
    if (!selectedProject) return;

    const newProjectRating = await postRating(selectedProject.id, rating);
    setRating(newProjectRating);
  };

  const handleDeleteRating = async () => {
    if (!selectedProject) return;

    const newProjectRating = await deleteRating(selectedProject.id);
    setRating(newProjectRating);
  };

  return (
    <div className={styles.preview}>
      {showPopup && <PreviewPopup onClose={() => setShowPopup(false)} project={selectedProject!} />}
      <div className={styles.card}>
        <Card sub className={styles.information}>
          {/* <HeroDescription download={download} /> */}
          <div className={clsx(styles.editor)}>
            <HeroTitle title={selectedProject?.title ?? ""} />
            {mode === "view" && rating && (
              <Rating rating={rating.average} suffix={`(${rating.count} Reviews)`} />
            )}
          </div>

          <CardDivider sub />

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
                {rating && <Rating rating={2.5} simple />}
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

            <CardDivider sub />
            <ButtonGroup className={clsx(styles.editor)}>
              {Object.entries(PROJECT_TYPES).map(([key, label]) => (
                <Button
                  key={key}
                  // transparent
                  // toggled
                  type={key === selectedProject.type ? "green" : "white"}
                  onClick={() =>
                    setDraftProject((prev) => ({ ...prev!, type: key as ProjectType }))
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

            <CardDivider sub />
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
                      tags: [...(prev?.tags ?? []), { name: tagInput }],
                    }))
                  }
                  center
                >
                  <BedrockText text="Create" type="p" color="white" />
                </Button>
              </div>
              <div className={styles.tags}>
                {(selectedProject?.tags ?? []).map((tag) => (
                  <Tag
                    border={"all"}
                    name={tag.name}
                    deletable
                    onDelete={() => {
                      setDraftProject((prev) => ({
                        ...prev!,
                        tags:
                          prev?.tags.filter((existingTag) => existingTag.name !== tag.name) ?? [],
                      }));
                    }}
                  />
                ))}
              </div>
            </div>

            <CardDivider sub />
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
      </div>

      <div className={styles.card}>
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
              </div>
              <CardDivider sub />
              <div className={styles.editor}>
                <TextEditor
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
              </div>
              <CardDivider sub />
              <div className={styles.editor}>
                <TextEditor
                  editable={false}
                  content={selectedProject?.description}
                  onChange={(data) => (editorContent.current = data)}
                />
              </div>
            </Card>
          </>
        )}
      </div>

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
      </div>
      {mode === "view" && (
        <div>
          <Rating
            rating={userRating}
            onReset={handleDeleteRating}
            onUpdate={async (rating) => await handlePostRating(rating)}
            className={styles.rating}
            selectable={true}
            size="medium"
          />
        </div>
      )}
      {mode === "view" && (
        <div className={styles.card}>
          <Card sub>
            <div className={styles.editor}>
              <HeroTitle title="Comments" />
            </div>
            <CardDivider sub />
            <div className={styles.editor}>
              <Input className={styles.input} ref={commentInputRef} placeholder="Your Comment..." />
              <Button
                className={styles.action}
                width="100%"
                type="green"
                onClick={handlePostComment}
                center
              >
                <BedrockText text="Post Comment" type="p" color="white" />
              </Button>
            </div>
            <div className={styles.editor}>
              <div className={styles.comments}>
                {comments?.length === 0 && (
                  <BedrockText text="No comments yet" type="p" color="white" />
                )}
                {comments?.map((comment, index) => (
                  <Comment
                    key={index}
                    comment={comment}
                    onReply={handlePostReply}
                    subComments={
                      comment.replies?.map((reply) => ({
                        comment: reply,
                      })) ?? []
                    }
                  />
                ))}
                {/* <Comment
                  creator="iDarkQ"
                  comment="It is a virus. I dont recommend"
                  subComments={[
                    { creator: "Notch", comment: "No, it is not a virus." },
                    { creator: "Herobrine", comment: "Yes, it is a virus." },
                  ]}
                />
                <Comment
                  creator="iDarkQ"
                  comment="It is a virus. I dont recommend"
                  subComments={[
                    { creator: "Notch", comment: "No, it is not a virus." },
                    { creator: "Herobrine", comment: "Yes, it is a virus." },
                  ]}
                /> */}
              </div>
            </div>
          </Card>
        </div>
      )}
      {mode === "review" && (
        <div className={styles.card}>
          <Card sub>
            <div className={styles.editor}>
              <HeroTitle title="Review" />
            </div>
            <CardDivider sub />
            <div className={styles.editor}>
              {selectedProject && (
                <GridDownloadCard project={{ ...selectedProject, user: { name: "iDarkQ" } }} />
              )}
            </div>
            <CardDivider sub />
            <div className={styles.editor}>
              <Button
                className={styles.action}
                width="100%"
                type="gold"
                center
                onClick={() => publish(selectedProject!.id)}
              >
                <BedrockText text="Publish" type="p" color="white" />
              </Button>
              <Button className={styles.action} width="100%" type="red" center>
                <BedrockText text="Decline Project" type="p" color="white" />
              </Button>

              {/* <Button
                  className={styles.action}
                  width="100%"
                  type="red"
                  center
                  onClick={handleDelete}
                >
                  <BedrockText text="Delete Project" type="p" color="white" />
                </Button> */}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
