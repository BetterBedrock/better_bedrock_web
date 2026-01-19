"use client";

import { PopupWrapper } from "@/shared/ui/popup";
import { SimpleButton } from "@/shared/ui/simple-button";
import { Tooltip } from "@/shared/ui/tooltip";
import ReportGlyph from "@/public/images/glyphs/WarningGlyph.png";
import { DetailedProjectDto } from "@/shared/lib/openapi";

import styles from "./project-details.module.scss";
import { PopupReport } from "@/features/report";

interface ProjectDetailsReportProps {
  detailedProject: DetailedProjectDto;
}

export const ProjectDetailsReport = ({
  detailedProject,
}: ProjectDetailsReportProps) => (
  <PopupWrapper
    className={styles.popup}
    popup={(close) => (
      <PopupReport
        name={detailedProject!.title}
        id={detailedProject!.id}
        type="project"
        onClose={close}
      />
    )}
  >
    <Tooltip text="Report Project">
      <SimpleButton transparent>
        <img src={ReportGlyph.src} className={styles.icon} />
      </SimpleButton>
    </Tooltip>
  </PopupWrapper>
);
