import { Collapsible } from "@/shared/ui/collapsible";

import { monetizationFAQQuestions } from "../../model/faq-questions";
import styles from "./faq.module.scss";

export const FAQList = () => (
  <div className={styles.questions}>
    {monetizationFAQQuestions.map((faqItem, index) => (
      <Collapsible
        key={faqItem.question}
        headerText={faqItem.question}
        contentText={faqItem.answer}
        width="100%"
        indexTextRef={index + 1}
      />
    ))}
  </div>
);
