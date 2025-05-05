import {
  useTutorialVideos,
  SectionType,
  TutorialVideosTitle,
  TutorialVideosDescription,
  TutorialVideosGrid,
} from ".";

export interface TutorialVideosProps {
  activeTab: number;
  section?: SectionType;
}

export const TutorialVideos = ({ activeTab, section }: TutorialVideosProps) => {
  const { sectionType, data } = useTutorialVideos({ activeTab, section });

  if (!data) {
    return null;
  }

  return (
    <div>
      <TutorialVideosTitle section={sectionType} />
      <TutorialVideosDescription description={data.description ?? "No description available."} />
      <TutorialVideosGrid section={data} />
    </div>
  );
};
