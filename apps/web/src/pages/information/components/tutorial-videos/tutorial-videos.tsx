import { InformationVideos } from "~/pages/information";
import { TutorialVideosTitle, TutorialVideosDescription, TutorialVideosGrid, styles } from ".";

export interface TutorialVideosProps {
  deprected: boolean;
  videos: InformationVideos;
}

export const TutorialVideos = ({ videos, deprected }: TutorialVideosProps) => (
  <div>
    <div className={styles.heading}>
      <TutorialVideosTitle deprected={deprected} />
      <TutorialVideosDescription description={videos.description ?? "No description available."} />
    </div>
    <TutorialVideosGrid videos={videos.videos} deprected={deprected} />
  </div>
);
