import {
  useTutorialVideos,
  SectionType,
  TutorialVideosTitle,
  TutorialVideosDescription,
  TutorialVideosGrid,
  styles,
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
      <div className={styles.heading}>
        <TutorialVideosTitle section={sectionType} />
        <TutorialVideosDescription description={data.description ?? "No description available."} />
      </div>
      <TutorialVideosGrid section={data} />
    </div>
  );
};
