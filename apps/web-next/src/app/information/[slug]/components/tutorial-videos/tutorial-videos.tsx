import { InformationVideos } from "@/app/information/[slug]";
import { TutorialVideosTitle, TutorialVideosDescription, TutorialVideosGrid, styles } from ".";

export interface TutorialVideosProps {
  videos: InformationVideos;
}

export const TutorialVideos = ({ videos }: TutorialVideosProps) => (
  <div>
    <div className={styles.heading}>
      <TutorialVideosTitle />
      <TutorialVideosDescription description={videos.description ?? "No description available."} />
    </div>
    <TutorialVideosGrid videos={videos.videos} />
  </div>
);
