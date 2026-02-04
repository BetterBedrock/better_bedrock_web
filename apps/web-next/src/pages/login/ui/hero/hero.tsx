import { HeroLoginButton } from "@/pages/login/ui/hero/hero-login-button";
import { HeroHeader } from "./hero-header";
import { Card } from "@/shared/ui/card";

export const Hero = () => (
  <Card fullWidth>
    <Card.Body>
      <HeroHeader />
    </Card.Body>
    <Card.Divider />
    <Card.Body>
      <HeroLoginButton />
    </Card.Body>
  </Card>
);
