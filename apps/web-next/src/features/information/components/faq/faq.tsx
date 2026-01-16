import { Card, CardBody, CardDivider } from "@/components/card";
import { InformationTab } from "@/features/shared/types/information";

import { FAQCollapsibleList } from "./faq-collapsible-list";
import { FAQDescription } from "./faq-description";
import { FAQTitle } from "./faq-title";

interface FAQProps {
  selectedCategory: InformationTab;
}

export const FAQ = ({ selectedCategory }: FAQProps) => (
  <Card fullWidth>
    <CardBody>
      <FAQTitle />
      <FAQDescription />
    </CardBody>
    <CardDivider />
    <CardBody>
      <FAQCollapsibleList selectedCategory={selectedCategory} />
    </CardBody>
  </Card>
);
