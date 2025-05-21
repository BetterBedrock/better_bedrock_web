import { Collapsible } from "~/components/bedrock/collapsible";
import { FAQSection } from "~/pages/information/components/faq/faq-data";
import { styles } from ".";

interface FAQCollapsibleListProps {
  faqSection: FAQSection;
}

export const FAQCollapsibleList = ({ faqSection }: FAQCollapsibleListProps) => (
  <div className={styles.question}>
    {faqSection.items.map((question, index) => (
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
