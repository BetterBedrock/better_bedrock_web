import { createContext, ReactNode, useContext, useState } from "react";
import { useNotification } from "~/providers/notification";
import { baseUrl } from "~/utils/url";
import {
  Configuration,
  ProjectApi,
  ProjectCommentDto,
  ProjectDto,
  ProjectRatingDto,
  SearchProjectsDto,
  SimpleProjectDto,
  UpdateProjectDto,
  UploadFileDto,
} from "~/lib/api";
import { useCookies } from "react-cookie";

interface ProjectContextProps {
  fetched: boolean;
  search: (type?: string, text?: string, page?: number) => Promise<SearchProjectsDto | undefined>;
  fetchDraftDetails: (id: string) => Promise<ProjectDto | undefined>;
  fetchProjectDetails: (id: string) => Promise<ProjectDto | undefined>;
  fetchUserProjects: (id: string) => Promise<SimpleProjectDto[] | undefined>;
  saveProject: (id: string, project: UpdateProjectDto) => Promise<ProjectDto | undefined>;
  uploadFile: (id: string, file: File) => Promise<UploadFileDto | undefined>;
  submittedProjects: () => Promise<SimpleProjectDto[] | undefined>;
  submitProject: (id: string) => Promise<ProjectDto | undefined>;
  cancelSubmission: (id: string) => Promise<ProjectDto | undefined>;
  deleteProject: (id: string) => Promise<void>;
  createProject: (title: string) => Promise<ProjectDto | undefined>;

  getProjectRating: (id: string) => Promise<ProjectRatingDto | undefined>;
  publish: (id: string) => Promise<void>;

  postComment: (projectId: string, content: string) => Promise<ProjectCommentDto | undefined>;
  replyToComment: (
    projectId: string,
    parentId: string,
    content: string,
  ) => Promise<ProjectCommentDto | undefined>;
  deleteComment: (commentId: string) => Promise<void>;

  getComments: (projectId: string) => Promise<ProjectCommentDto[] | undefined>;
  postRating: (projectId: string, rating: number) => Promise<ProjectRatingDto | undefined>;
  deleteRating: (projectId: string) => Promise<ProjectRatingDto | undefined>;
}

interface ProjectProviderProps {
  children: ReactNode;
}

const ProjectContext = createContext<ProjectContextProps | undefined>(undefined);

export const ProjectProvider = ({ children }: ProjectProviderProps) => {
  const { throwError, sendNotification } = useNotification();
  const [cookie] = useCookies(["secret", "adminSecret"]);

  const [fetched, _blank] = useState<boolean>(false);
  const config = new Configuration({ basePath: baseUrl, accessToken: cookie.secret });
  const adminConfig = new Configuration({ basePath: baseUrl, accessToken: cookie.adminSecret });

  const projectApi = new ProjectApi(config);
  const adminProjectApi = new ProjectApi(adminConfig);

  const search = async (
    type?: string,
    text?: string,
    page?: number,
  ): Promise<SearchProjectsDto | undefined> => {
    try {
      const { data } = await projectApi.projectControllerSearch(type, text, page);
      return data;
    } catch (err) {
      throwError(err, "Failed searching for projects");
    }
  };

  const fetchProjectDetails = async (id: string): Promise<ProjectDto | undefined> => {
    try {
      const { data } = await projectApi.projectControllerProjectDetails(id);
      return data;
    } catch (err) {
      throwError(err, "Failed fetching draft details");
    }
  };

  const fetchDraftDetails = async (id: string): Promise<ProjectDto | undefined> => {
    try {
      const { data } = await projectApi.projectControllerDraftDetails(id);
      return data;
    } catch (err) {
      throwError(err, "Failed fetching draft details");
    }
  };

  const fetchUserProjects = async (id: string): Promise<SimpleProjectDto[] | undefined> => {
    try {
      const { data } = await projectApi.projectControllerUserProjects(id);
      return data;
    } catch (err) {
      throwError(err, "Failed fetching draft details");
    }
  };

  const uploadFile = async (id: string, file: File): Promise<UploadFileDto | undefined> => {
    try {
      const { data } = await projectApi.projectControllerUploadProjectFile(id, file);
      sendNotification({
        type: "success",
        title: "Project",
        label: "File uploaded successfully",
      });
      return data;
    } catch (err) {
      throwError(err, "Failed to upload file");
    }
  };

  const createProject = async (title: string): Promise<ProjectDto | undefined> => {
    try {
      const { data } = await projectApi.projectControllerCreate({ title });
      return data;
    } catch (err) {
      throwError(err, "Failed to save project");
    }
  };

  const saveProject = async (id: string, project: UpdateProjectDto) => {
    try {
      const { data } = await projectApi.projectControllerUpdate(id, project);
      sendNotification({
        type: "info",
        title: data.title,
        label: "Project has been saved",
      });
      return data;
    } catch (err) {
      throwError(err, "Failed to save project");
    }
  };

  const submittedProjects = async (): Promise<SimpleProjectDto[] | undefined> => {
    try {
      const { data } = await adminProjectApi.projectControllerSubmitted();
      return data;
    } catch (err) {
      throwError(err, "Failed to fetch submitted projects");
    }
  };

  const submitProject = async (id: string): Promise<ProjectDto | undefined> => {
    try {
      const { data } = await projectApi.projectControllerSubmit(id);
      sendNotification({
        type: "info",
        title: data.title,
        label: "Project has been submitted for review",
      });
      return data;
    } catch (err) {
      throwError(err, "Failed to submit project");
    }
  };

  const cancelSubmission = async (id: string): Promise<ProjectDto | undefined> => {
    try {
      const { data } = await projectApi.projectControllerCancelSubmission(id);
      sendNotification({
        type: "info",
        title: data.title,
        label: "Project submission has been cancelled",
      });
      return data;
    } catch (err) {
      throwError(err, "Failed to submit project");
    }
  };

  const publish = async (id: string): Promise<void> => {
    try {
      await adminProjectApi.projectControllerPublish(id);
      sendNotification({
        type: "success",
        title: id,
        label: "The project has been published",
      });
    } catch (err) {
      throwError(err, "Failed to publish project");
    }
  };

  const deleteProject = async (id: string) => {
    try {
      await projectApi.projectControllerDelete(id);
      sendNotification({
        type: "info",
        title: id,
        label: "The project has been deleted",
      });
    } catch (err) {
      throwError(err, "Failed to delete project");
    }
  };

  const getProjectRating = async (id: string) => {
    try {
      const { data } = await projectApi.projectControllerGetProjectRating(id);
      return data;
    } catch (err) {
      throwError(err, "Failed to fetch project rating");
    }
  };

  const postRating = async (projectId: string, rating: number) => {
    try {
      const { data } = await projectApi.projectControllerRateProject(projectId, rating);
      sendNotification({
        type: "info",
        title: "Rating",
        label: `You just rated this project ${rating} stars.`,
      });

      return data;
    } catch (err) {
      throwError(err, "Failed to post rating");
    }
  };

  const deleteRating = async (projectId: string) => {
    try {
      const { data } = await projectApi.projectControllerDeleteRating(projectId);
      sendNotification({
        type: "info",
        title: "Rating",
        label: `Reset your rating for this project`,
      });
      return data;
    } catch (err) {
      throwError(err, "Failed to reset rating");
    }
  };

  const postComment = async (projectId: string, content: string) => {
    try {
      const { data } = await projectApi.projectControllerPostComment(projectId, { content });
      sendNotification({
        type: "success",
        title: "Comment posted",
        label: "Your comment has been posted successfully",
      });

      return data;
    } catch (err) {
      throwError(err, "Failed to post comment");
    }
  };

  const replyToComment = async (projectId: string, parentId: string, content: string) => {
    try {
      const { data } = await projectApi.projectControllerReplyToComment(projectId, parentId, {
        content,
      });
      sendNotification({
        type: "success",
        title: "Comment posted",
        label: "Your comment has been posted successfully",
      });

      return data;
    } catch (err) {
      throwError(err, "Failed to post comment");
    }
  };

  const deleteComment = async (commentId: string) => {
    try {
      await projectApi.projectControllerDeleteComment(commentId);
      sendNotification({
        type: "info",
        title: "Comment deleted",
        label: "The comment has been deleted",
      });
    } catch (err) {
      throwError(err, "Failed to delete comment");
    }
  };

  const getComments = async (projectId: string) => {
    try {
      const { data } = await projectApi.projectControllerComments(projectId);
      return data;
    } catch (err) {
      throwError(err, "Failed to fetch comments");
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        fetched,
        search,
        fetchDraftDetails,
        uploadFile,
        saveProject,
        fetchUserProjects,
        submittedProjects,
        submitProject,
        cancelSubmission,
        deleteProject,
        publish,
        fetchProjectDetails,
        createProject,
        getProjectRating,
        postComment,
        deleteComment,
        getComments,
        replyToComment,
        postRating,
        deleteRating,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);

  if (!context) {
    throw Error("Context useProject must be used within ProjectProvider");
  }

  return context;
};
