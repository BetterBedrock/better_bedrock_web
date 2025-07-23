import styles from "./downloads.module.scss";
import { useState } from "react";

import { Section } from "~/components/section";
import { Ad } from "~/pages/downloads/components/ad";
import { Tabs } from "~/pages/downloads/components/tabs";
import { Community } from "~/pages/downloads/components/community/community";
import { SideProjects } from "~/pages/downloads/components/side-projects";
import { Main } from "~/pages/downloads/components/main";

export const Downloads = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <main>
      <Section className={styles.background} fixed center>
        <div className={styles.header}>
          <Ad />
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {activeTab === 0 && <Main setActiveTab={setActiveTab}/>}

        {activeTab === 1 && <Community />}

        {activeTab === 2 && <SideProjects />}
      </Section>
    </main>
  );
};
