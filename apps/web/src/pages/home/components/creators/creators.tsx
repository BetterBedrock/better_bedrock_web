import { Section } from "~/components/section";
import { CREATORS, HELPERS, styles, CreatorsModule } from ".";

export const Creators = () => (
  <Section className={styles.background} extraClassName={styles.padding} center>
    <CreatorsModule
      title="CREATORS"
      description="Meet the creators behind the project! Initially created by AmBro and later expanded by iDarkQ. Check out the parts they worked on below!"
      contributors={CREATORS}
    />
    <CreatorsModule
      title="HELPERS"
      description="Meet the Better Bedrock helpers. They have significantly contributed to developing many features for the TexturePack."
      contributors={HELPERS}
    />
  </Section>
);
