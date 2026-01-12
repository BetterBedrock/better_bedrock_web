import { Header } from "./header/header";
import { Statistics } from "./statistics/statistics";

import styles from "./hero.module.scss";
import { Card, CardBody, CardDivider } from "@/components/card/card";

export const Hero = () => (
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
