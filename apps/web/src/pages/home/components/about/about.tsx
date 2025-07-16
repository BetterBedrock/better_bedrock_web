import { Section } from "~/components/section";
import { styles, aboutSectionsData, AboutList } from ".";

interface AboutProps {
  sectionIndex: 0 | 1;
}

export const About = ({ sectionIndex }: AboutProps) => {
  const { elements, backgroundImage } = aboutSectionsData[sectionIndex] || aboutSectionsData[0];

  return (
    <Section
      className={styles.background}
      extraClassName={styles.inner}
      style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7)), url(${backgroundImage})` }}
      center
    >
      <AboutList items={elements} direction={sectionIndex === 0 ? "left" : "right"} />
    </Section>
  );
}