import { GridCard } from "@/pages/information/[slug]/ui/tutorial-videos/grid-card";
import { InformationVideo } from "@/shared/model/information";

import styles from "./tutorial-videos.module.scss";

interface TutorialVideosGridProps {
  videos: InformationVideo[];
}

export const TutorialVideosGrid = ({ videos }: TutorialVideosGridProps) => (
  <div className={styles.grid}>
    {videos.map((tutorial, index) => (
      <GridCard
        key={tutorial.title + index}
        index={index + 1}
        title={tutorial.title}
        description={tutorial.description}
        link={tutorial.link}
        tags={[...(tutorial.tags ?? [])]}
      />
    ))}
  </div>
);
