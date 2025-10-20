import { CreatorsListElement, styles } from ".";
import { ModuleContributorsList, ModuleDescription, ModuleTitle } from "./module";

interface CreatorsModuleProps {
  title: string;
  description: string;
  contributors: CreatorsListElement[];
}

export const CreatorsModule = ({ title, description, contributors }: CreatorsModuleProps) => (
  <div className={styles.module}>
    <ModuleTitle text={title} />
    <ModuleDescription text={description} />
    <ModuleContributorsList data={contributors} />
  </div>
);
