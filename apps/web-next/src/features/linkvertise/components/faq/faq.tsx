import { Card, CardBody, CardDivider } from "@/components/card";
import { FAQList } from "./faq-list";
import { FAQTitle } from "./faq-title";
import { FAQDescription } from "./faq-description";

export const FAQ = () => (
  <Card fullWidth>
    <CardBody>
      <FAQTitle />
      <FAQDescription />
    </CardBody>
    <CardDivider />
    <CardBody>
      <FAQList />
    </CardBody>
  </Card>
);
