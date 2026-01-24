import { Section } from "@/shared/ui/section";
import { aboutSectionsData } from "./about-data";
import { AboutList } from "./about-list";

import styles from "./about.module.scss";

interface AboutProps {
  sectionIndex: 0 | 1;
}

export const About = ({ sectionIndex }: AboutProps) => {
  const { elements, backgroundImage } =
    aboutSectionsData[sectionIndex] || aboutSectionsData[0];

  return (
    <Section
      className={styles.background}
      extraClassName={styles.inner}
      center
      dark
      gradientBackground={false}
      src={backgroundImage}
    >
      <AboutList
        items={elements}
        direction={sectionIndex === 0 ? "left" : "right"}
      />
    </Section>
  );
};
