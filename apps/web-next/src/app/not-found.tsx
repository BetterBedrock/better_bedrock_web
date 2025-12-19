import { Section } from "@/components/section";
import { NotFound as Not } from "@/features/home/components/not-found/not-found";
import styles from "@/features/home/components/not-found/not-found.module.scss";

export const metadata = {
  title: "404 Not Found",
  description:
    "The page you are looking for does not exist. Return to the homepage and explore the best Minecraft PE texture packs, scripts, maps, skins, and more on Better Bedrock.",
};

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
