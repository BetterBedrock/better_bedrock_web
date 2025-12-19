"use client";

import { DetailedProjectDto, UpdateProjectDto } from "@/lib/api";
import { updateProject } from "@/features/project/server/update-project";
import { useNotification } from "@/providers/notification";
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
    detailedProject.description
  );

  const [selectedProject, setSelectedProject] =
    useState<DetailedProjectDto>(detailedProject);

  const handleSaveProject = async (
    project: UpdateProjectDto
  ): Promise<boolean> => {
    project.description =
      typeof editorContent.current === "object" &&
      editorContent.current !== null
        ? editorContent.current
        : {};

    const savedProject = await updateProject(selectedProject.id, project);
    return savedProject ? true : false;
  };

  const checkIfSubmitted = () => {
    if (selectedProject?.submitted) {
      throwError(
        null,
        "The project has already been submitted, you cannot make any changes unless you cancel submission"
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
      "useProjectManager has to be used within ProjectManagerContext"
    );
  }

  return context;
};
