"use server";

import { fetchLoggedUser } from "@/lib/auth/fetch-logged-user";
import { SimpleUserDto } from "@/lib/api";
import { fetchDetailedUser } from "@/lib/user/fetch-detailed-user";
import { UserActionReport } from "@/features/users/components/profile/user/user-action-report";
import { UserActionSettings } from "@/features/users/components/profile/user/user-action-settings";

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
        <UserActionSettings
          detailedSelectedUser={detailedSelectedUser}
          admin={user?.admin ?? false}
          ownsProfile={ownsProfile}
        />
      )}
    </div>
  );
};
