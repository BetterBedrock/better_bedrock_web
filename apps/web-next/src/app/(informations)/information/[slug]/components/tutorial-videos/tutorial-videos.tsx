import { TutorialVideosDescription } from "./tutorial-videos-description";
import { TutorialVideosGrid } from "./tutorial-videos-grid";
import { TutorialVideosTitle } from "./tutorial-videos-title";
import { InformationVideos } from "@/app/(informations)/information/[slug]/data/information-data";

import styles from "./tutorial-videos.module.scss";

export interface TutorialVideosProps {
  videos: InformationVideos;
}

export const TutorialVideos = ({ videos }: TutorialVideosProps) => (
  <div>
    <div className={styles.heading}>
      <TutorialVideosTitle />
      <TutorialVideosDescription
        description={videos.description ?? "No description available."}
      />
    </div>
    <TutorialVideosGrid videos={videos.videos} />
  </div>
);
