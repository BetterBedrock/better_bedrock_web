import { Section } from "~/components/section";
import { Hero, HeroReportPopup } from "./components/hero";
import { styles } from ".";
import { useReportsManager } from "~/pages/panel/reports/providers/reports-manager";

export const Reports = () => {
  const { selectedReport } = useReportsManager();

  return (
    <main>
      {selectedReport && <HeroReportPopup />}
      <Section className={styles.background} extraClassName={styles.padding} fixed>
        <Hero />
      </Section>
    </main>
  );
};
