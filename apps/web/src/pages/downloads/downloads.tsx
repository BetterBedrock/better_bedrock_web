import styles from "./downloads.module.scss";
import { useState } from "react";

import { Section } from "~/components/section";
import { DownlaodsAd } from "~/pages/downloads/downloads-ad";
import { DownloadsTabsList } from "~/pages/downloads/downloads-tabs-list";
import { DownloadsThemes } from "~/pages/downloads/downloads-themes";
import { DownloadsSideProjects } from "~/pages/downloads/downloads-side-projects";
import { DownloadsMain } from "~/pages/downloads/downloads-main";

export const Downloads = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Section className={styles.background} fixed>
      <div className={styles.header}>
        <DownlaodsAd />
        <DownloadsTabsList activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {activeTab === 0 && <DownloadsMain />}

      {activeTab === 1 && <DownloadsThemes />}

      {activeTab === 2 && <DownloadsSideProjects />}
    </Section>
  );
};
