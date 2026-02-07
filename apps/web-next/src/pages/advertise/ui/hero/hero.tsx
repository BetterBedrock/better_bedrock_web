import { Card } from "@/shared/ui/card";
import { HeroTitle } from "./hero-title";
import { HeroDescription } from "./hero-description";
import { HeroVideo } from "./hero-video";

export const Hero = () => (
  <Card fullWidth>
    <Card.Body>
      <HeroTitle />
      <HeroDescription />
    </Card.Body>
    <Card.Divider />
    <Card.Body>
      <HeroVideo />
    </Card.Body>
  </Card>
);
