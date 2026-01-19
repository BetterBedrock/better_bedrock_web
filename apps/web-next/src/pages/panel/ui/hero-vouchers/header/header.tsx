import { HeaderTitle } from "./header-title";
import { HeaderDescription } from "./header-description";
import { Card, CardBody } from "@/shared/ui/card";

export const Header = () => (
  <Card fullWidth>
    <CardBody>
      <HeaderTitle />
      <HeaderDescription />
    </CardBody>
  </Card>
);
