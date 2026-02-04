import { Card } from "@/shared/ui/card";
import { InformationTab } from "@/shared/lib/information";

import { FAQCollapsibleList } from "./faq-collapsible-list";
import { FAQDescription } from "./faq-description";
import { FAQTitle } from "./faq-title";

interface FAQProps {
  selectedCategory: InformationTab;
}

export const FAQ = ({ selectedCategory }: FAQProps) => (
  <Card fullWidth>
    <Card.Body>
      <FAQTitle />
      <FAQDescription />
    </Card.Body>
    <Card.Divider />
    <Card.Body>
      <FAQCollapsibleList selectedCategory={selectedCategory} />
    </Card.Body>
  </Card>
);
