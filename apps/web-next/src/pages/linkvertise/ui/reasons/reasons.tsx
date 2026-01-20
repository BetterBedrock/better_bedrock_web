import { Card, CardBody, CardDivider } from "@/shared/ui/card";
import { ReasonsGridList } from "./reasons-grid-list";
import styles from "./reasons.module.scss";
import { ReasonsTitle } from "./reasons-title";
import { ReasonsDescription } from "./reasons-description";

export const Reasons = () => (
  <Card fullWidth>
    <CardBody>
      <ReasonsTitle />
      <ReasonsDescription />
    </CardBody>
    <CardDivider />
    <CardBody>
      <ReasonsGridList />
    </CardBody>
  </Card>
);
