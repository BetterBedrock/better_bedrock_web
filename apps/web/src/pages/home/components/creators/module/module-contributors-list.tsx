import DownloadCard from "~/components/bedrock/download-card/download-card";
import { CreatorsListElement } from "../";
import { styles } from ".";

interface ModuleContributorsListProps {
  data: CreatorsListElement[];
}

export const ModuleContributorsList = ({ data }: ModuleContributorsListProps) => (
  <div className={styles.cardsContainerCreators}>
    {data.map((item) => {
      return (
        <DownloadCard
          buttonType="alwaysGreen"
          title={item.name}
          description={item.description}
          playSound={false}
          lockClicking={true}
        />
      );
    })}
  </div>
);
