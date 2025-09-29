import { SimpleButton } from "~/components/bedrock/simple-button";
import SettingsGlyph from "~/assets/images/settings_glyph.png";
import ReportGlyph from "~/assets/images/glyphs/WarningGlyph.png";
import { styles, UserSettingsForm } from ".";
import { useUserProfile } from "~/pages/profile/providers/user-profile";
import { PopupWrapper } from "~/components/bedrock/popup/popup-wrapper";
import { PopupReport } from "~/components/bedrock/popup/popup-report";

export const UserProfileActions = () => {
  const {
    user,
    selectedUser,
    detailedSelectedUser,
    setSettingsOpen,
    ownsProfile,
    handleProfileSave,
  } = useUserProfile();
  const canRate = user && user?.name !== selectedUser!.name;

  return (
    <div className={styles.icons}>
      {canRate && (
        <PopupWrapper
          popup={(close) => (
            <PopupReport
              name={selectedUser!.name}
              id={selectedUser!.id}
              type="user"
              onClose={close}
            />
          )}
        >
          <SimpleButton transparent>
            <img src={ReportGlyph} className={styles.report} />
          </SimpleButton>
        </PopupWrapper>
      )}
      {detailedSelectedUser && (
        <PopupWrapper
          popup={(close) => (
            <UserSettingsForm
              user={detailedSelectedUser}
              onClose={close}
              admin={!ownsProfile && user?.admin}
              onSave={handleProfileSave}
            />
          )}
        >
          <SimpleButton transparent onClick={() => setSettingsOpen(true)}>
            <img src={SettingsGlyph} className={styles.settings} />
          </SimpleButton>
        </PopupWrapper>
      )}
    </div>
  );
};
