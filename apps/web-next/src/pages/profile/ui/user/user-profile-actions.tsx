"use server";

import { fetchLoggedUser } from "@/entities/auth";
import { SimpleUserDto } from "@/shared/lib/openapi";
import { UserActionReport } from "./user-action-report";
import { UserActionSettings } from "./user-action-settings";
import { fetchDetailedUser } from "@/entities/user";

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
