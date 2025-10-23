import { Section } from "~/components/section";
import { Outlet } from "react-router-dom";
import { Tabs } from "~/pages/profile/components/tabs";
import { CircularProgressIndicator } from "~/components/bedrock/circular-progress-indicator";
import { User } from "./components/user";

import { styles, useProfile } from ".";

export const Profile = () => {
  const { fetchedDetailedUser } = useProfile();

  return (
    <main>
      <Section
        className={styles.background}
        extraClassName={styles.padding}
        fixed
        center={!fetchedDetailedUser}
      >
        {fetchedDetailedUser ? (
          <div className={styles.wrapper}>
            <User />

            <Tabs />

            <Outlet />
          </div>
        ) : (
          <CircularProgressIndicator size="medium" />
        )}
      </Section>
    </main>
  );
};
