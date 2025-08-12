import { Section } from "~/components/section";
import { User } from "./components/user";
import { styles } from ".";

export const Profile = () => (
  <main>
    <Section className={styles.background} extraClassName={styles.padding} fixed>
      <User />
    </Section>
  </main>
);
