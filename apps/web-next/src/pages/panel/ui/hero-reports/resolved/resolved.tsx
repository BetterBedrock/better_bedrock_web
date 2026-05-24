import { Card } from "@/shared/ui/card";
import { ResolvedEmpty } from "@/pages/panel/ui/hero-reports/resolved/resolved-empty";
import { ResolvedList } from "@/pages/panel/ui/hero-reports/resolved/resolved-list";

export const Resolved = () => (
  <Card fullWidth>
    <Card.Body>
      <ResolvedEmpty />
      <ResolvedList />
    </Card.Body>
  </Card>
);
