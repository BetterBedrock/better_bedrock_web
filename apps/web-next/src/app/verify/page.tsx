import { Hero } from "./components/hero";
import { styles } from ".";
import { Section } from "@/_components/section";

interface FetchProps {
  searchParams: Promise<{
    hash?: string;
  }>;
}

export default async function Verify({ searchParams }: FetchProps) {
  const hash = (await searchParams).hash;

  return (
    <main>
      <Section
        className={styles.background}
        extraClassName={styles.padding}
        center
        fixed
      >
        <Hero hash={hash} />
      </Section>
    </main>
  );
}
