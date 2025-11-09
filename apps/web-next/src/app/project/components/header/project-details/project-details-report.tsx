"use client";

import { PopupReport } from "@/_components/popup/popup-report";
import { PopupWrapper } from "@/_components/popup/popup-wrapper";
import { SimpleButton } from "@/_components/simple-button";
import { Tooltip } from "@/_components/tooltip";
import { styles } from ".";
import ReportGlyph from "@/public/images/glyphs/WarningGlyph.png";
import { DetailedProjectDto } from "@/_lib/api";

interface ProjectDetailsReportProps {
  detailedProject: DetailedProjectDto;
}

export const ProjectDetailsReport = ({
  detailedProject,
}: ProjectDetailsReportProps) => {
  return (
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
};
