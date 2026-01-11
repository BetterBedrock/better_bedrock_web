import { Card, CardBody, CardDivider } from "@/components/card";
import { InformationTab } from "@/features/shared/types/information";

import { HeaderDescription } from "./header-description";
import { HeaderTabs } from "./header-tabs";
import { HeaderTitle } from "./header-title";

interface HeaderProps {
  selectedCategory: InformationTab;
}

export const Header = ({ selectedCategory }: HeaderProps) => (
  <Card fullWidth>
    <CardBody>
      <HeaderTitle />
      <HeaderDescription />
    </CardBody>
    <CardDivider />
    <CardBody>
      <HeaderTabs selectedCategory={selectedCategory} />
    </CardBody>
  </Card>
);
