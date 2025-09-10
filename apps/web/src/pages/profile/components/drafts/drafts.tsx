import { styles, DraftsList, DraftsAction } from ".";
import { useUserProfile } from "~/pages/profile/providers/user-profile";
import { useAuth } from "~/providers/auth";

export const Drafts = () => {
  const { user } = useAuth();
  const { selectedUser } = useUserProfile();

  const isOwner = selectedUser?.id === user?.id;

  return (
    <div className={styles.list}>
      {isOwner && <DraftsAction />}
      <DraftsList />
    </div>
  );
};
