import { Card, CardDivider } from "@/components/card";
import { FAQHeading } from "./faq-heading";
import { FAQList } from "./faq-list";
import styles from "./faq.module.scss";

export const FAQ = () => (
  <div className={styles.section}>
    <Card className={styles.card}>
      <FAQHeading />
      <CardDivider />
      <FAQList />
    </Card>
  </div>
);
