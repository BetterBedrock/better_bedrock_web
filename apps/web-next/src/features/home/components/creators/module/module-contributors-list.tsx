import { CreatorsListElement } from "@/features/home/components/creators/creators-data";
import { ModuleCard } from "./module-card";
import styles from "./module.module.scss";

interface ModuleContributorsListProps {
  data: CreatorsListElement[];
}

export const ModuleContributorsList = ({
  data,
}: ModuleContributorsListProps) => (
  <div className={styles.list}>
    {data.map((item, index) => (
      <ModuleCard key={index} data={item} />
    ))}
  </div>
);
