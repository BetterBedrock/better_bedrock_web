import React from "react";
import { HeaderTabs } from "~/pages/information/components/header/header-tabs";
import { HeaderTitle } from "~/pages/information/components/header/header-title";
import { HeaderDescription } from "~/pages/information/components/header/header-description";

interface HeaderProps {
  activeTab: number;
  setActiveTab: (index: number) => void;
}

export const Header = ({ activeTab, setActiveTab }: HeaderProps) => {
  return (
    <div>
      <HeaderTitle />
      <HeaderDescription />
      <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};
