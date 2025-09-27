import { Section } from "~/components/section";
import { Hero } from "./components/hero";
import { styles } from ".";
import { DownloadProvider } from "~/providers/download";

export const Fetch = () => (
  <main>
    <Section className={styles.background} extraClassName={styles.padding} center fixed>
      <DownloadProvider>
        <Hero />
      </DownloadProvider>
    </Section>
  </main>
);
