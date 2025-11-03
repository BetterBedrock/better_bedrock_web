import { HeaderDescription } from "@/app/information/[slug]/components/header/header-description";
import { HeaderTabs } from "@/app/information/[slug]/components/header/header-tabs";
import { HeaderTitle } from "@/app/information/[slug]/components/header/header-title";
import { InformationTab } from "@/app/information/[slug]/data";

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
