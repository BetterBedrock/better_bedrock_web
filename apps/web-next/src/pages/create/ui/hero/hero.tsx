import { HeroActions } from "./hero-actions";
import { Card } from "@/shared/ui/card";
import { HeroHeader } from "./hero-header";

export const Hero = () => (
  <Card fullWidth>
    <Card.Body>
      <HeroHeader />
    </Card.Body>
    <Card.Divider />
    <Card.Body>
      <HeroActions />
    </Card.Body>
  </Card>
);
