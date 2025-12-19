import { InformationTab } from "@/features/shared/types/information";
import { HeaderDescription } from "./header-description";
import { HeaderTabs } from "./header-tabs";
import { HeaderTitle } from "./header-title";

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
