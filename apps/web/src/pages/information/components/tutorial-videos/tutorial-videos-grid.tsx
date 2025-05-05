import { GridCard } from "~/components/bedrock/grid-card/grid-card";
import { styles } from ".";
import { TutorialSection } from "~/pages/information/components/tutorial-videos/tutorial-videos-data";

interface TutorialVideosGridProps {
  section: TutorialSection;
}

export const TutorialVideosGrid = ({ section }: TutorialVideosGridProps) => (
  <div className={styles.grid}>
    {section.items.map((tutorial, index) => (
      <GridCard
        key={tutorial.title}
        index={index + 1}
        title={tutorial.title}
        description={tutorial.description}
        link={tutorial.link}
      />
    ))}
  </div>
);
