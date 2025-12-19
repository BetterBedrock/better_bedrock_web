import { InformationTab } from "@/features/shared/types/information";
import { FAQCollapsibleList } from "./faq-collapsible-list";
import { FAQDescription } from "./faq-description";
import { FAQTitle } from "./faq-title";

import styles from "./faq.module.scss";

interface FAQProps {
  selectedCategory: InformationTab;
}

export const FAQ = ({ selectedCategory }: FAQProps) => (
  <div className={styles.faq}>
    <div className={styles.heading}>
      <FAQTitle />
      <FAQDescription description={selectedCategory.faq.description} />
    </div>
    <FAQCollapsibleList selectedCategory={selectedCategory} />
  </div>
);
