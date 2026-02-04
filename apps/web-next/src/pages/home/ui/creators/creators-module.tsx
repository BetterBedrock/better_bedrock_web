import { CreatorsListElement } from "./creators-data";
import { ModuleContributorsList } from "./module/module-contributors-list";
import { ModuleDescription } from "./module/module-description";
import { ModuleTitle } from "./module/module-title";
import styles from "./creators.module.scss";

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
