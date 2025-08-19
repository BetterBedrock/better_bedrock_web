import { createContext, ReactNode, useContext, useState } from "react";
import { useNotification } from "~/providers/notification";
import { baseUrl } from "~/utils/url";
import {
  Configuration,
  ProjectApi,
  ProjectDto,
  SimpleProjectDto,
  UpdateProjectDto,
  UploadFileDto,
} from "~/lib/api";
import { useCookies } from "react-cookie";

interface ProjectContextProps {
  fetched: boolean;
  fetchDraftDetails: (id: string) => Promise<ProjectDto | undefined>;
  fetchProjectDetails: (id: string) => Promise<ProjectDto | undefined>;
  fetchUserProjects: (id: string) => Promise<SimpleProjectDto[] | undefined>;
  saveProject: (id: string, project: UpdateProjectDto) => Promise<ProjectDto | undefined>;
  uploadFile: (id: string, file: File) => Promise<UploadFileDto | undefined>;
  submittedProjects: () => Promise<SimpleProjectDto[] | undefined>;
  submitProject: (id: string) => Promise<ProjectDto | undefined>;
  cancelSubmission: (id: string) => Promise<ProjectDto | undefined>;
  deleteProject: (id: string) => Promise<void>;

  publish: (id: string) => Promise<void>;
}

interface ProjectProviderProps {
  children: ReactNode;
}

const ProjectContext = createContext<ProjectContextProps | undefined>(undefined);

export const ProjectProvider = ({ children }: ProjectProviderProps) => {
  const { throwError } = useNotification();
  const [cookie] = useCookies(["secret", "adminSecret"]);

  const [fetched, _blank] = useState<boolean>(false);
  const config = new Configuration({ basePath: baseUrl, accessToken: cookie.secret });
  const adminConfig = new Configuration({ basePath: baseUrl, accessToken: cookie.adminSecret });

  const projectApi = new ProjectApi(config);
  const adminProjectApi = new ProjectApi(adminConfig);

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
      return data;
    } catch (err) {
      throwError(err, "Failed to upload file");
    }
  };

  const saveProject = async (id: string, project: UpdateProjectDto) => {
    try {
      const { data } = await projectApi.projectControllerUpdate(id, project);
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
      return data;
    } catch (err) {
      throwError(err, "Failed to submit project");
    }
  };

  const cancelSubmission = async (id: string): Promise<ProjectDto | undefined> => {
    try {
      const { data } = await projectApi.projectControllerCancelSubmission(id);
      return data;
    } catch (err) {
      throwError(err, "Failed to submit project");
    }
  };

  const publish = async (id: string): Promise<void> => {
    try {
      await adminProjectApi.projectControllerPublish(id);
    } catch (err) {
      throwError(err, "Failed to publish project");
    }
  };

  const deleteProject = async (id: string) => {
    try {
      await projectApi.projectControllerDelete(id);
    } catch (err) {
      throwError(err, "Failed to delete project");
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        fetched,
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
