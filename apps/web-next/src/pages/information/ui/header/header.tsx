import { Card } from "@/shared/ui/card";
import { InformationTab } from "@/shared/lib/information";

import { HeaderDescription } from "./header-description";
import { HeaderTabs } from "./header-tabs";
import { HeaderTitle } from "./header-title";

interface HeaderProps {
  selectedCategory: InformationTab;
}

export const Header = ({ selectedCategory }: HeaderProps) => (
  <Card fullWidth>
    <Card.Body>
      <HeaderTitle />
      <HeaderDescription />
    </Card.Body>
    <Card.Divider />
    <Card.Body>
      <HeaderTabs selectedCategory={selectedCategory} />
    </Card.Body>
    {/* <CardDivider />
    <CardBody>
      <PartnerImage />
    </CardBody> */}
  </Card>
);
  