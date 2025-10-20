import { HeaderTabs } from "~/pages/information/components/header/header-tabs";
import { HeaderTitle } from "~/pages/information/components/header/header-title";
import { HeaderDescription } from "~/pages/information/components/header/header-description";
import { InformationTab } from "~/pages/information";

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
