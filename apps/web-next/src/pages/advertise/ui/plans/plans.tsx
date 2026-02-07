import { Card } from "@/shared/ui/card";
import { PlansOptions } from "./plans-options";
import { PlansDescription } from "./plans-description";
import { PlansTitle } from "./plans-title";

export const Plans = () => (
  <Card fullWidth>
    <Card.Body>
      <PlansTitle />
      <PlansDescription />
    </Card.Body>
    <Card.Divider />
    <Card.Body>
      <PlansOptions />
    </Card.Body>
  </Card>
);
