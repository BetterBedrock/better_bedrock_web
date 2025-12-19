import { FAQDescription } from "./faq-description";
import { FAQTitle } from "./faq-title";
import styles from "./faq.module.scss";

export const FAQHeading = () => (
  <div className={styles.cardTextWrapper}>
    <FAQTitle />
    <FAQDescription />
  </div>
);
