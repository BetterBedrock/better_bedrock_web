import { Card } from "@/shared/ui/card";
import { ReasonsGridList } from "./reasons-grid-list";
import { ReasonsTitle } from "./reasons-title";
import { ReasonsDescription } from "./reasons-description";

export const Reasons = () => (
  <Card fullWidth>
    <Card.Body>
      <ReasonsTitle />
      <ReasonsDescription />
    </Card.Body>
    <Card.Divider />
    <Card.Body>
      <ReasonsGridList />
    </Card.Body>
  </Card>
);
