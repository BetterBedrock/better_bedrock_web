import { Collapsible } from "~/components/bedrock/collapsible";
import clsx from "clsx";

import { styles, linkvertiseFAQQuestions } from ".";

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
