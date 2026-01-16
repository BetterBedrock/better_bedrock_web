import { Card, CardBody, CardDivider } from "@/components/card";
import { HeroVideo } from "./hero-video";
import { HeroTitle } from "./hero-title";
import { HeroDescription } from "./hero-description";

export const Hero = () => (
  <Card fullWidth>
    <CardBody>
      <HeroTitle />
      <HeroDescription />
    </CardBody>
    <CardDivider />
    <CardBody>
      <HeroVideo />
    </CardBody>
  </Card>
);
