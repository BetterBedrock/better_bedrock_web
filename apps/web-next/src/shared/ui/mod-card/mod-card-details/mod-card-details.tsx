import { Card } from "@/shared/ui/card";
import { ModCardDetailsName } from "@/shared/ui/mod-card/mod-card-details/mod-card-details-name";
import { ModCardDetailsTags } from "@/shared/ui/mod-card/mod-card-details/mod-card-details-tags";

import styles from "./mod-card-details.module.scss";

interface ModCardDetailsProps {
  name: string;
  tags: string[];
}

export const ModCardDetails = ({ name, tags }: ModCardDetailsProps) => (
  <Card.Body className={styles.details}>
    <Card.Item>
      <ModCardDetailsName name={name} />
      <ModCardDetailsTags tags={tags} />
    </Card.Item>
  </Card.Body>
);
