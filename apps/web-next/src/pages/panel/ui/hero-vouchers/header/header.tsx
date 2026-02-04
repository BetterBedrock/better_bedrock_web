import { HeaderTitle } from "./header-title";
import { HeaderDescription } from "./header-description";
import { Card } from "@/shared/ui/card";

export const Header = () => (
  <Card fullWidth>
    <Card.Body>
      <HeaderTitle />
      <HeaderDescription />
    </Card.Body>
  </Card>
);
