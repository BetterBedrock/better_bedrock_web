import { Card } from "@/shared/ui/card";
import { HeaderDescription } from "./header-description";
import { HeaderTitle } from "./header-title";

export const Header = () => (
  <Card fullWidth>
    <Card.Body>
      <HeaderTitle />
      <HeaderDescription />
    </Card.Body>
  </Card>
);
