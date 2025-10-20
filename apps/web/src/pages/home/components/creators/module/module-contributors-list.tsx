import { CreatorsListElement } from "../";
import { styles, ModuleCard } from ".";

interface ModuleContributorsListProps {
  data: CreatorsListElement[];
}

export const ModuleContributorsList = ({ data }: ModuleContributorsListProps) => (
  <div className={styles.list}>
    {data.map((item, index) => (
      <ModuleCard key={index} data={item} />
    ))}
  </div>
);
