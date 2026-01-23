import { Header } from "./header/header";
import { Statistics } from "./statistics/statistics";
import { Card, CardBody, CardDivider } from "@/shared/ui/card";

export const Files = () => (
  <Card fullWidth>
    <CardBody>
      <Header />
    </CardBody>
    <CardDivider />
    <CardBody>
      <Statistics />
    </CardBody>
  </Card>
);
