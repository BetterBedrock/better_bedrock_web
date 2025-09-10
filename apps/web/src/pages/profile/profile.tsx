import { Section } from "~/components/section";
import { styles } from ".";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { Tabs } from "~/pages/profile/components/tabs";
import { useUser } from "~/providers/user";
import { useCallback, useEffect } from "react";
import { Routes } from "~/utils/routes";
import { CircularProgressIndicator } from "~/components/bedrock/circular-progress-indicator";
import { useAuth } from "~/providers/auth";
import { User } from "./components/user";
import { useUserProfile } from "~/pages/profile/providers/user-profile";

export const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { findUserByName } = useUser();
  const { user } = useAuth();
  const { fetchDetails, setSelectedUser, fetchedDetailedUser } = useUserProfile();

  const fetchSelectedUser = useCallback(
    async (id: string) => {
      const data = await findUserByName(id);
      if (!data) {
        navigate(Routes.HOME);
        return;
      }
      setSelectedUser(data);
      await fetchDetails(data);
    },
    [findUserByName, navigate, fetchDetails, setSelectedUser],
  );

  useEffect(() => {
    if (!id) {
      navigate(Routes.HOME);
      return;
    }
    fetchSelectedUser(id);
  }, [user, id]);

  return (
    <main>
      <Section
        className={styles.background}
        extraClassName={styles.padding}
        fixed
        center={!fetchedDetailedUser}
      >
        {fetchedDetailedUser ? (
          <div className={styles.wrapper}>
            <User />

            <Tabs />

            <Outlet />
          </div>
        ) : (
          <CircularProgressIndicator size="medium" />
        )}
      </Section>
    </main>
  );
};
