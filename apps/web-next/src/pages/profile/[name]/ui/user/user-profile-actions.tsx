"use server";

import { fetchLoggedUser } from "@/shared/api/fetch-logged-user";
import { SimpleUserDto } from "@/shared/api/openapi";
import { fetchDetailedUser } from "@/lib/user/fetch-detailed-user";
import { UserActionReport } from "@/pages/profile/[name]/ui/user/user-action-report";
import { UserActionSettings } from "@/pages/profile/[name]/ui/user/user-action-settings";

import styles from "./user.module.scss";

interface UserProfileActionsProps {
  selectedUser: SimpleUserDto;
}

export const UserProfileActions = async ({
  selectedUser,
}: UserProfileActionsProps) => {
  const user = await fetchLoggedUser();
  const detailedSelectedUser = await fetchDetailedUser(selectedUser.id);
  const ownsProfile = !selectedUser ? false : user?.name === selectedUser.name;
  const canRate = user && user?.name !== selectedUser!.name;

  return (
    <div className={styles.icons}>
      {canRate && (
        <UserActionReport id={selectedUser.id} name={selectedUser.name} />
      )}
      {detailedSelectedUser && (
        // TODO: doesnt show when normal user is logged in??? it should display settings
        <UserActionSettings
          detailedSelectedUser={detailedSelectedUser}
          admin={user?.admin ?? false}
          ownsProfile={ownsProfile}
        />
      )}
    </div>
  );
};
