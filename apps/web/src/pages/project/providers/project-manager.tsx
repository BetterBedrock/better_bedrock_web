import { Content } from "@tiptap/react";
import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { DetailedProjectDto, UpdateProjectDto } from "~/lib/api";
import { useProject } from "~/providers/project";
import { useUser } from "~/providers/user";

interface ProjectManagerContextProps {
  editorContent: React.RefObject<Content | undefined>;

  fetchSelectedProject: (id: string, draft: boolean) => Promise<DetailedProjectDto | undefined>;
  handleSaveProject: (project: UpdateProjectDto) => Promise<void>;

  fetched: boolean;
  selectedProject: DetailedProjectDto | undefined;
  setSelectedProject: React.Dispatch<React.SetStateAction<DetailedProjectDto | undefined>>;

  userRating: number | undefined;
  setUserRating: React.Dispatch<React.SetStateAction<number | undefined>>;
}

interface ProjectManagerProviderProps {
  children: ReactNode;
}

const ProjectManagerContext = createContext<ProjectManagerContextProps | undefined>(undefined);

export const ProjectManagerProvider = ({ children }: ProjectManagerProviderProps) => {
  const { file } = useParams();
  const { getUserRating } = useUser();
  const { fetchProjectDetails, fetchDraftDetails, saveProject } = useProject();

  const editorContent = useRef<Content | undefined>(undefined);

  const [userRating, setUserRating] = useState<number | undefined>(undefined);

  const [fetched, setFetched] = useState(false);
  const [selectedProject, setSelectedProject] = useState<DetailedProjectDto | undefined>();

  const fetchSelectedProject = async (id: string, draft: boolean) => {
    const project = draft ? await fetchDraftDetails(id) : await fetchProjectDetails(id);
    const rating = await getUserRating(id);

    setUserRating(rating);
    setSelectedProject(project);
    setFetched(true);
    return project;
  };

  const handleSaveProject = async (project: UpdateProjectDto) => {
    if (!selectedProject) return;

    project.description =
      typeof editorContent.current === "object" && editorContent.current !== null
        ? editorContent.current
        : {};

    await saveProject(selectedProject.id, project);
  };

  useEffect(() => {
    if (!file) return;
  }, [file]);

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
      }}
    >
      {children}
    </ProjectManagerContext.Provider>
  );
};

export const useProjectManager = () => {
  const context = useContext(ProjectManagerContext);

  if (!context) {
    throw Error("useProjectManager has to be used within ProjectManagerContext");
  }

  return context;
};
