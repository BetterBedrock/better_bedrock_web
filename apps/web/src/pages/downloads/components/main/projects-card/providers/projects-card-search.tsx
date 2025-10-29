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
import { SearchProjectTypeKey } from "~/assets/content/better-bedrock";
import { SearchOrder } from "~/lib/api";

interface ProjectsCardSearchContextProps {
  inputRef: RefObject<HTMLInputElement | null>;

  selectedType: SearchProjectTypeKey;
  setSelectedType: Dispatch<SetStateAction<SearchProjectTypeKey>>;

  selectedOrder: string;
  setSelectedOrder: Dispatch<SetStateAction<string>>;
}

interface ProjectsCardSearchProvider {
  children: ReactNode;
}

const ProjectsCardSearchContext = createContext<ProjectsCardSearchContextProps | undefined>(
  undefined,
);

export const ProjectsCardSearchProvider = ({ children }: ProjectsCardSearchProvider) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedType, setSelectedType] = useState<SearchProjectTypeKey>("all");
  const [selectedOrder, setSelectedOrder] = useState<string>(Object.values(SearchOrder)[0]);

  return (
    <ProjectsCardSearchContext.Provider
      value={{ inputRef, selectedOrder, setSelectedOrder, selectedType, setSelectedType }}
    >
      {children}
    </ProjectsCardSearchContext.Provider>
  );
};

export const useProjectsCardSearch = () => {
  const context = useContext(ProjectsCardSearchContext);

  if (!context) {
    throw Error("useProjectsCardSearch has to be used within ProjectsCardSearchContext");
  }

  return context;
};
