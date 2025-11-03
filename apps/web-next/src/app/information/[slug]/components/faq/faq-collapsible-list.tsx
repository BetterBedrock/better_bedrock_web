import { Collapsible } from "@/_components/collapsible";
import { InformationTab } from "@/app/information/[slug]/data";

import { styles } from ".";

interface FAQCollapsibleListProps {
  selectedCategory: InformationTab;
}

export const FAQCollapsibleList = ({ selectedCategory }: FAQCollapsibleListProps) => (
  <div className={styles.question}>
    {selectedCategory.faq.questions.map((question, index) => (
      <Collapsible
        key={question.question}
        headerText={question.question}
        contentText={question.answer}
        width="100%"
        indexTextRef={index + 1}
      />
    ))}
  </div>
);
