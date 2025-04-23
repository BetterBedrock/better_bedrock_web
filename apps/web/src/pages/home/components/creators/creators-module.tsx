import { CreatorsListElement } from ".";
import {
  ModuleContributorsList,
  ModuleDescription,
  ModuleTitle,
} from "./module";

interface CreatorsModuleProps {
  title: string;
  description: string;
  contributors: CreatorsListElement[];
}

export const CreatorsModule = ({ title, description, contributors }: CreatorsModuleProps) => (
  <div>
    <ModuleTitle text={title} />
    <ModuleDescription text={description} />
    <ModuleContributorsList data={contributors} />
  </div>
);