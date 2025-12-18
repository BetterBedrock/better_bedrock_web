import { HeaderDescription } from "./header-description";
import { HeaderTabs } from "./header-tabs";
import { HeaderTitle } from "./header-title";
import { InformationTab } from "@/app/(informations)/information/[slug]/data/information-data";

interface HeaderProps {
  selectedCategory: InformationTab;
}

export const Header = ({ selectedCategory }: HeaderProps) => (
  <div>
    <HeaderTitle />
    <HeaderDescription />
    <HeaderTabs selectedCategory={selectedCategory} />
  </div>
);
