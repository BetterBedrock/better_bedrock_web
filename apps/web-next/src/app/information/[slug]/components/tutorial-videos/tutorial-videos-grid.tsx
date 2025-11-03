import { InformationVideo } from "@/app/information/[slug]/data";
import { GridCard } from "@/_components/grid-card";

import { styles } from ".";

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
