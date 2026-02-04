import { Header } from "./header/header";
import { Statistics } from "./statistics/statistics";

import { Card } from "@/shared/ui/card";

export const HeroAnalytics = () => (
  <Card fullWidth>
    <Card.Body>
      <Header />
    </Card.Body>
    <Card.Divider />
    <Card.Body>
      <Statistics />
    </Card.Body>
  </Card>
);
