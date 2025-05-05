// hooks/useTutorialVideos.ts
import { useMemo } from "react";
import { ALL_SECTIONS, Sections } from "~/pages/information";
import {
  TUTORIALS,
} from "~/pages/information/components/tutorial-videos/tutorial-videos-data";

export type SectionType = "default" | "deprecated";

interface UseTutorialVideosProps {
  activeTab: number;
  section?: SectionType;
}

export function useTutorialVideos({
  activeTab,
  section = "default",
}: UseTutorialVideosProps) {
  const activeSectionKey = useMemo<Sections>(
    () => ALL_SECTIONS[activeTab] ?? "general",
    [activeTab],
  );

  const tutorials = useMemo(() => TUTORIALS[activeSectionKey] ?? null, [activeSectionKey]);
  const deprecatedTutorials = useMemo(
    () => TUTORIALS[`${activeSectionKey}Deprecated` as Sections] ?? null,
    [activeSectionKey],
  );

  const data = useMemo(() => {
    if (section === "deprecated") {
      return deprecatedTutorials;
    }
    return tutorials;
  }, [section, tutorials, deprecatedTutorials]);

  return { sectionType: section, data };
}
