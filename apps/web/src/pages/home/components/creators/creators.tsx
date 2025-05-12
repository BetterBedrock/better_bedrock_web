import { Section } from "~/components/section";
import { CREATORS, HELPERS, styles, CreatorsModule } from ".";

export const Creators = () => (
  <Section className={styles.background} center>
    <CreatorsModule
      title="CREATORS"
      description="Meet the creators behind the project! Initially created by AmBro, then extended by iDarkQ. See below the parts they are responsible for!"
      contributors={CREATORS}
    />
    <CreatorsModule
      title="HELPERS"
      description="Meet the Better Bedrock helpers. These people have significantly contributed to the development of many features in the TexturePack."
      contributors={HELPERS}
    />
  </Section>
);
