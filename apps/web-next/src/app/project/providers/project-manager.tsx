"use client";

import { DetailedProjectDto, UpdateProjectDto, UserDto } from "@/_lib/api";
import { useAuth } from "@/_providers/auth";
import { useNotification } from "@/_providers/notification";
import { useProject } from "@/_providers/project";
import { useUser } from "@/_providers/user";
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

interface ProjectManagerContextProps {
  editorContent: RefObject<Content | undefined>;
  downloadButtonRef: RefObject<HTMLButtonElement | null>;

  fetchSelectedProject: (
    id: string,
    draft: boolean
  ) => Promise<DetailedProjectDto | undefined>;
  handleSaveProject: (project: UpdateProjectDto) => Promise<boolean>;

  fetched: boolean;
  selectedProject: DetailedProjectDto | undefined;
  setSelectedProject: Dispatch<SetStateAction<DetailedProjectDto | undefined>>;

  userRating: number | undefined;
  setUserRating: Dispatch<SetStateAction<number | undefined>>;

  checkIfSubmitted: () => boolean;
}

interface ProjectManagerProviderProps {
  children: ReactNode;
  detailedProject: DetailedProjectDto;
  user?: UserDto;
}

const ProjectManagerContext = createContext<
  ProjectManagerContextProps | undefined
>(undefined);

export const ProjectManagerProvider = ({
  children,
  detailedProject,
  user,
}: ProjectManagerProviderProps) => {
  const { getUserRating } = useUser();
  const { throwError } = useNotification();
  const { fetchProjectDetails, fetchDraftDetails, saveProject } = useProject();

  const downloadButtonRef = useRef<HTMLButtonElement>(null);
  const editorContent = useRef<Content | undefined>(undefined);

  const [userRating, setUserRating] = useState<number | undefined>(undefined);

  const [fetched, setFetched] = useState(false);
  const [selectedProject, setSelectedProject] = useState<
    DetailedProjectDto | undefined
  >(detailedProject);

  const fetchSelectedProject = async (id: string, draft: boolean) => {
    const project = draft
      ? await fetchDraftDetails(id)
      : await fetchProjectDetails(id);

    if (user) {
      const rating = await getUserRating(id);

      setUserRating(rating);
    }

    setSelectedProject(project);
    setFetched(true);
    return project;
  };

  const handleSaveProject = async (
    project: UpdateProjectDto
  ): Promise<boolean> => {
    if (!selectedProject) return false;

    project.description =
      typeof editorContent.current === "object" &&
      editorContent.current !== null
        ? editorContent.current
        : {};

    const savedProject = await saveProject(selectedProject.id, project);
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
        fetchSelectedProject,
        handleSaveProject,
        fetched,
        selectedProject,
        setSelectedProject,
        userRating,
        setUserRating,
        downloadButtonRef,
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
