import { InformationTab } from "@/app/information/[slug]";
import { styles, FAQTitle, FAQCollapsibleList, FAQDescription } from ".";

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
