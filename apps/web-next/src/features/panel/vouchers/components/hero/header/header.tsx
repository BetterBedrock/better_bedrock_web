import { HeaderTitle } from "./header-title";
import { HeaderDescription } from "./header-description";
import { Card, CardBody } from "@/components/card/card";

export const Header = () => (
  <Card fullWidth>
    <CardBody>
      <HeaderTitle />
      <HeaderDescription />
    </CardBody>
  </Card>
);
