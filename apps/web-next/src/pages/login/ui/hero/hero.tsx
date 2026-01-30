import { HeroLoginButton } from "@/pages/login/ui/hero/hero-login-button";
import { HeroHeader } from "./hero-header";
import { Card, CardBody, CardDivider } from "@/shared/ui/card";

export const Hero = () => (
  <Card fullWidth>
    <CardBody>
      <HeroHeader />
    </CardBody>
    <CardDivider />
    <CardBody>
      <HeroLoginButton />
    </CardBody>
  </Card>
);
