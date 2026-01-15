"use client";

import { DetailedProjectDto, UpdateProjectDto } from "@/shared/api/openapi";
import { updateProject } from "@/entities/project/api/update-project";
import { useNotification } from "@/shared/model/notification";
import { Content } from "@tiptap/react";
import {
  createContext,
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
  useContext,
  useRef,
  useState,
} from "react";

export interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

interface ProjectManagerContextProps {
  editorContent: RefObject<Content | undefined>;

  handleSaveProject: (project: UpdateProjectDto) => Promise<boolean>;

  selectedProject: DetailedProjectDto;
  setSelectedProject: Dispatch<SetStateAction<DetailedProjectDto>>;

  checkIfSubmitted: () => boolean;
  detailedProject: DetailedProjectDto;
}

interface ProjectManagerProviderProps {
  children: ReactNode;
  detailedProject: DetailedProjectDto;
}

const ProjectManagerContext = createContext<
  ProjectManagerContextProps | undefined
>(undefined);

export const ProjectManagerProvider = ({
  children,
  detailedProject,
}: ProjectManagerProviderProps) => {
  const { throwError } = useNotification();

  const editorContent = useRef<Content | undefined>(
    detailedProject.description,
  );

  const [selectedProject, setSelectedProject] =
    useState<DetailedProjectDto>(detailedProject);

  const handleSaveProject = async (
    project: UpdateProjectDto,
  ): Promise<boolean> => {
    project.description = editorContent.current
      ? JSON.parse(JSON.stringify(editorContent.current))
      : {};

    const request = await updateProject(selectedProject.id, project);

    if (request.error) {
      throwError(null, request.error);
      return false;
    }

    return request.data ? true : false;
  };

  const checkIfSubmitted = () => {
    if (selectedProject?.submitted) {
      throwError(
        null,
        "The project has already been submitted, you cannot make any changes unless you cancel submission",
      );
      return false;
    }
    return true;
  };

  return (
    <ProjectManagerContext.Provider
      value={{
        editorContent,
        detailedProject,
        handleSaveProject,
        selectedProject,
        setSelectedProject,
        checkIfSubmitted,
      }}
    >
      {children}
    </ProjectManagerContext.Provider>
  );
};

export const useProjectManager = () => {
  const context = useContext(ProjectManagerContext);

  if (!context) {
    throw Error(
      "useProjectManager has to be used within ProjectManagerContext",
    );
  }

  return context;
};
