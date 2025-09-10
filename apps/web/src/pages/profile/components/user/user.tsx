import { PopupReport } from "~/components/bedrock/popup/popup-report";
import { UserCard, UserSettingsForm } from ".";
import { useUserProfile } from "~/pages/profile/providers/user-profile";

export const User = () => {
  const {
    selectedUser,
    settingsOpen,
    setSettingsOpen,
    reportOpen,
    setReportOpen,
    detailedSelectedUser,
    ownsProfile,
    user,
    handleProfileSave,
  } = useUserProfile();

  return (
    <>
      {settingsOpen && detailedSelectedUser && (
        <UserSettingsForm
          user={detailedSelectedUser}
          onClose={() => setSettingsOpen(false)}
          admin={!ownsProfile && user?.admin}
          onSave={handleProfileSave}
        />
      )}
      {reportOpen && selectedUser && (
        <PopupReport
          name={selectedUser.name}
          id={selectedUser.id}
          type="user"
          onClose={() => setReportOpen(false)}
        />
      )}
      <UserCard />
    </>
  );
};
