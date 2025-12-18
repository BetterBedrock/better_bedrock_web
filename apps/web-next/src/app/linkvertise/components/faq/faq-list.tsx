import clsx from "clsx";
import { Collapsible } from "@/_components/collapsible";

import { linkvertiseFAQQuestions } from "./data/faq-questions";
import styles from "./faq.module.scss";

export const FAQList = () => (
  <div className={clsx(styles.question, styles.cardContainer)}>
    {linkvertiseFAQQuestions.map((question, index) => (
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
