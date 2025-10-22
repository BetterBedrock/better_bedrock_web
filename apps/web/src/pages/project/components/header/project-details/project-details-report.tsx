import { PopupReport } from "~/components/bedrock/popup/popup-report";
import { PopupWrapper } from "~/components/bedrock/popup/popup-wrapper";
import { styles } from ".";
import { useProjectManager } from "~/pages/project/providers/project-manager";
import { SimpleButton } from "~/components/bedrock/simple-button";
import { Tooltip } from "~/components/bedrock/tooltip";
import ReportGlyph from "~/assets/images/glyphs/WarningGlyph.png";

export const ProjectDetailsReport = () => {
  const { selectedProject } = useProjectManager();

  return (
    <PopupWrapper
      className={styles.popup}
      popup={(close) => (
        <PopupReport
          name={selectedProject!.title}
          id={selectedProject!.id}
          type="project"
          onClose={close}
        />
      )}
    >
      <Tooltip text="Report Project">
        <SimpleButton transparent>
          <img src={ReportGlyph} className={styles.icon} />
        </SimpleButton>
      </Tooltip>
    </PopupWrapper>
  );
};
