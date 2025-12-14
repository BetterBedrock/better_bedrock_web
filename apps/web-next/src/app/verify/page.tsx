import { Hero } from "./components/hero";
import { styles } from ".";
import { Section } from "@/_components/section";

interface FetchProps {
  searchParams: Promise<{
    hash?: string;
  }>;
}

export const metadata = {
  title: "Download Content Verification",
  description:
    "Verify your session and begin downloading the best Minecraft PE texture packs, scripts, maps, skins, and more from Better Bedrock securely.",
};

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
