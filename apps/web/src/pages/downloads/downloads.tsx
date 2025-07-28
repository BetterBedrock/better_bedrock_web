import styles from "./downloads.module.scss";
import { useEffect } from "react";

import { Section } from "~/components/section";
import { Ad } from "~/pages/downloads/components/ad";
import { Tabs } from "~/pages/downloads/components/tabs";
import { Community } from "~/pages/downloads/components/community/community";
import { SideProjects } from "~/pages/downloads/components/side-projects";
import { Main } from "~/pages/downloads/components/main";
import { useNavigate, useParams } from "react-router-dom";
import { useContent } from "~/providers/content";
import { DownloadsDto } from "~/lib/api";
import { Routes } from "~/utils/routes";

export const Downloads = () => {
  const { category } = useParams();

  const navigate = useNavigate();
  const { downloads } = useContent();

  useEffect(() => {
    if (!downloads) return;

    if (!downloads[category as keyof DownloadsDto]) {
      navigate(Routes.HOME);
      return;
    }
  }, [downloads]);

  const handleSetActiveTab = (tab: string) => {
    navigate(Routes.DOWNLOADS + "/" + tab);
  };

  return (
    <main>
      <Section className={styles.background} fixed>
        <div className={styles.header}>
          <Ad />
          <Tabs
            activeTab={category!}
            setActiveTab={handleSetActiveTab}
          />
        </div>

        {category === "main" && <Main setActiveTab={handleSetActiveTab} />}

        {category === "community" && <Community />}

        {category === "sideProjects" && <SideProjects />}
      </Section>
    </main>
  );
};
