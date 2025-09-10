import { SimpleButton } from "~/components/bedrock/simple-button";
import SettingsGlyph from "~/assets/images/settings_glyph.png";
import ReportGlyph from "~/assets/images/glyphs/WarningGlyph.png";
import { styles } from ".";
import { useUserProfile } from "~/pages/profile/providers/user-profile";

export const UserProfileActions = () => {
  const { user, selectedUser, detailedSelectedUser, setSettingsOpen, setReportOpen } =
    useUserProfile();
  const canRate = user && user?.name !== selectedUser!.name;

  return (
    <div className={styles.icons}>
      {canRate && (
        <SimpleButton transparent onClick={() => setReportOpen(true)}>
          <img src={ReportGlyph} className={styles.report} />
        </SimpleButton>
      )}
      {detailedSelectedUser && (
        <SimpleButton transparent onClick={() => setSettingsOpen(true)}>
          <img src={SettingsGlyph} className={styles.settings} />
        </SimpleButton>
      )}
    </div>
  );
};
