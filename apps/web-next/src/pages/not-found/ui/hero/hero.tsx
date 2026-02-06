import { HeroActions } from "./hero-actions";
import { HeroHeader } from "./hero-header";
import { Card } from "@/shared/ui/card";
import styles from "./hero.module.scss";
import { Section } from "@/shared/ui/section";

export const Hero = () => (
  <Section
    extraClassName={styles.padding}
    fixed
    center
    src="/images/crosshair_backgrounds/6.webp"
  >
    <Card fullWidth>
      <Card.Body>
        <HeroHeader />
      </Card.Body>
      <Card.Divider />
      <Card.Body>
        <HeroActions />
      </Card.Body>
    </Card>
  </Section>
);
