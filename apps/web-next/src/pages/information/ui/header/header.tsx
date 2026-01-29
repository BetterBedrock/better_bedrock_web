import { Card, CardBody, CardDivider } from "@/shared/ui/card";
import { InformationTab } from "@/shared/lib/information";

import { HeaderDescription } from "./header-description";
import { HeaderTabs } from "./header-tabs";
import { HeaderTitle } from "./header-title";
import { PartnerImage } from "@/shared/ui/partner-image";

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
    {/* <CardDivider />
    <CardBody>
      <PartnerImage />
    </CardBody> */}
  </Card>
);
