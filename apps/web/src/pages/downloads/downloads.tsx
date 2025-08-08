import styles from "./downloads.module.scss";
import { useEffect } from "react";

import { Section } from "~/components/section";
import { Ad } from "~/pages/downloads/components/ad";
import { Tabs } from "~/pages/downloads/components/tabs";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useContent } from "~/providers/content";
import { Routes } from "~/utils/routes";
import { CircularProgressIndicator } from "~/components/bedrock/circular-progress-indicator";

export const Downloads = () => {
  const { category } = useParams();

  const navigate = useNavigate();
  const { downloads, fetched } = useContent();

  const showLoading = !category || !downloads || !fetched;

  if (!category && downloads) {
    navigate(Routes.DOWNLOADS + "/" + downloads.default);
  }

  useEffect(() => {
    if (!downloads) return;

    if (!downloads.categories.find((c) => c.id === category)) {
      navigate(Routes.DOWNLOADS + "/" + downloads.default);
    }
  }, [category]);

  return (
    <main>
      <Section
        className={styles.background}
        extraClassName={styles.padding}
        fixed
        center={showLoading}
      >
        {!showLoading ? (
          <div className={styles.header}>
            <Ad />
            <Tabs activeTab={category!} />
          </div>
        ) : (
          <CircularProgressIndicator size="large" />
        )}
        <Outlet />
      </Section>
    </main>
  );
};
