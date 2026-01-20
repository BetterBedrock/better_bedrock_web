import { Card, CardBody } from "@/shared/ui/card/card";
import { HeaderDescription } from "./header-description";
import { HeaderTitle } from "./header-title";

export const Header = () => (
  <Card fullWidth>
    <CardBody>
      <HeaderTitle />
      <HeaderDescription />
    </CardBody>
  </Card>
);
