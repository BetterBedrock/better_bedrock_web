import { Card } from "@/shared/ui/card";
import { FAQList } from "./faq-list";
import { FAQTitle } from "./faq-title";
import { FAQDescription } from "./faq-description";
import { FAQAction } from "./faq-action";

export const FAQ = () => (
  <Card fullWidth>
    <Card.Body>
      <FAQTitle />
      <FAQDescription />
    </Card.Body>
    <Card.Divider />
    <Card.Body>
      <FAQList />
    </Card.Body>
    <Card.Divider />
    <Card.Body>
      <FAQAction />
    </Card.Body>
  </Card>
);
