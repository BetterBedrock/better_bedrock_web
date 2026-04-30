"use client";

import { CircularProgressIndicator } from "@/shared/ui/circular-progress-indicator";
import { Popup } from "@/shared/ui/popup";
import { HeroReportsPopupBase } from "./hero-reports-popup-base";
import { HeroReportsPopupActions } from "@/pages/panel/ui/hero-reports/hero-reports-popup/hero-reports-popup-actions";
import { HeroReportsPopupUserAvatar } from "@/pages/panel/ui/hero-reports/hero-reports-popup/hero-reports-popup-user-avatar";
import { HeroReportsPopupGridDownloadCard } from "@/pages/panel/ui/hero-reports/hero-reports-popup/hero-reports-popup-grid-download-card";

import styles from "./hero-reports-popup.module.scss";
import { useHeroReportsPopup } from "@/pages/panel/model/use-hero-reports-popup";

export const HeroReportsPopup = () => {
  const {
    project,
    fetched,
    selectedReport,
    setSelectedReport,
    reporter,
    reported,
    displayBase,
    displayProjectCard,
    displayUserAvatar,
    handleResolveButton,
  } = useHeroReportsPopup();

  if (!selectedReport) return;

  return (
    <Popup title="Report" onClose={() => setSelectedReport(null)}>
      <Popup.Body>
        {!fetched && (
          <Popup.Part>
            <CircularProgressIndicator className={styles.loader} />
          </Popup.Part>
        )}

        {displayBase && (
          <HeroReportsPopupBase
            message={selectedReport.message}
            reporter={reporter!}
          />
        )}

        {displayUserAvatar && (
          <HeroReportsPopupUserAvatar reported={reported!} />
        )}
        {displayProjectCard && (
          <HeroReportsPopupGridDownloadCard project={project} />
        )}
      </Popup.Body>

      {fetched && selectedReport && (
        <HeroReportsPopupActions
          handleResolveButton={handleResolveButton}
          resolved={selectedReport.resolved}
        />
      )}
    </Popup>
  );
};
