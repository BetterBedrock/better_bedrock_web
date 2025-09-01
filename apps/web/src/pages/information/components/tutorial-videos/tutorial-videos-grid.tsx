import { GridCard } from "~/components/bedrock/grid-card/grid-card";
import { styles } from ".";
import { InformationVideo } from "~/pages/information";

interface TutorialVideosGridProps {
  videos: InformationVideo[];
}

export const TutorialVideosGrid = ({ videos }: TutorialVideosGridProps) => (
  <div className={styles.grid}>
    {videos.map((tutorial, index) => (
      <GridCard
        key={tutorial.title}
        index={index + 1}
        title={tutorial.title}
        description={tutorial.description}
        link={tutorial.link}
        tags={[...(tutorial.tags ?? [])]}
      />
    ))}
  </div>
);
