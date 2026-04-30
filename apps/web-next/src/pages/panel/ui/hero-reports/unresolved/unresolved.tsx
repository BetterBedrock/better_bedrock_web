import { Card } from "@/shared/ui/card";
import { UnresolvedEmpty } from "@/pages/panel/ui/hero-reports/unresolved/unresolved-empty";
import { UnresolvedList } from "@/pages/panel/ui/hero-reports/unresolved/unresolved-list";

export const Unresolved = () => (
  <Card fullWidth>
    <Card.Body>
      <UnresolvedEmpty />
      <UnresolvedList />
    </Card.Body>
  </Card>
);
