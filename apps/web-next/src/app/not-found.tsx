import { Section } from "@/_components/section";
import { NotFound as Not } from "@/app/components/not-found";
import { styles } from "@/app/components/not-found";

export default function NotFound() {
  return (
    <Section
      className={styles.background}
      extraClassName={styles.padding}
      fixed
      center
    >
      <Not />
    </Section>
  );
}
