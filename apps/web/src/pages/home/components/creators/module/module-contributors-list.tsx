import { CreatorsListElement } from "../";
import { styles } from ".";
import { ModuleCard } from "~/pages/home/components/creators/module/module-card";

interface ModuleContributorsListProps {
  data: CreatorsListElement[];
}

export const ModuleContributorsList = ({ data }: ModuleContributorsListProps) => (
  <div className={styles.list}>
    {data.map((item, index) => {
      return (
        <ModuleCard key={index} creator={item.creator} title={item.name} description={item.description ?? ""} />
      );
    })}
  </div>
);
