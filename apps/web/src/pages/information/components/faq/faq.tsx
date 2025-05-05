import React from "react";
import { Sections, ALL_SECTIONS } from "~/pages/information/information";
import { styles, FAQTitle, FAQCollapsibleList, FAQDescription } from ".";
import { QUESTIONS } from "~/pages/information/components/faq/faq-data";

interface FAQProps {
  activeTab: number;
}

export const FAQ = ({ activeTab }: FAQProps) => {
  const activeSection: Sections =
    activeTab < ALL_SECTIONS.length ? ALL_SECTIONS[activeTab] : "general";
  const faqSection = QUESTIONS[activeSection];

  return (
    <div className={styles.faq}>
      <div className={styles.heading}>
        <FAQTitle />
        <FAQDescription description={faqSection.description} />
      </div>
      <FAQCollapsibleList faqSection={faqSection} />
    </div>
  );
};
