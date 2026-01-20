"use client";

import { SearchOrder } from "@/shared/api/openapi";
import { SearchProjectTypeKey } from "@/public/content/better-bedrock";
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

interface ProjectsCardSearchContextProps {
  inputRef: RefObject<HTMLInputElement | null>;

  selectedType: SearchProjectTypeKey;
  setSelectedType: Dispatch<SetStateAction<SearchProjectTypeKey>>;

  selectedOrder: SearchOrder;
  setSelectedOrder: Dispatch<SetStateAction<SearchOrder>>;
}

interface ProjectsCardSearchProvider {
  children: ReactNode;
}

const ProjectsCardSearchContext = createContext<
  ProjectsCardSearchContextProps | undefined
>(undefined);

export const ProjectsCardSearchProvider = ({
  children,
}: ProjectsCardSearchProvider) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedType, setSelectedType] = useState<SearchProjectTypeKey>("all");
  const [selectedOrder, setSelectedOrder] = useState<SearchOrder>(
    SearchOrder.Newest,
  );

  return (
    <ProjectsCardSearchContext.Provider
      value={{
        inputRef,
        selectedOrder,
        setSelectedOrder,
        selectedType,
        setSelectedType,
      }}
    >
      {children}
    </ProjectsCardSearchContext.Provider>
  );
};

export const useProjectsCardSearch = () => {
  const context = useContext(ProjectsCardSearchContext);

  if (!context) {
    throw Error(
      "useProjectsCardSearch has to be used within ProjectsCardSearchContext",
    );
  }

  return context;
};
