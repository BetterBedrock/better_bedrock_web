import { useNavigate } from "react-router-dom";
import { styles } from ".";
import { Routes } from "~/utils/routes";
import { useEffect, useState } from "react";
import { useAnalytics } from "~/providers/analytics";
import { StatisticsCard } from "~/components/bedrock/statistics-card";
import { useUserProfile } from "~/pages/profile/providers/user-profile";
import { CircularProgressIndicator } from "~/components/bedrock/circular-progress-indicator";
import { Banner } from "~/components/bedrock/banner";

export const StatsList = () => {
  const navigate = useNavigate();
  const { selectedUser, setAnalytics, analytics } = useUserProfile();
  const { fetchUserAnalytics } = useAnalytics();

  const [fetchedUserId, setFetchedUserId] = useState(() => {
    if (selectedUser && analytics && analytics.length > 0) {
      return selectedUser.id;
    }
    return null;
  });

  const fetchAnalytics = async (id: string) => {
    const data = await fetchUserAnalytics(id);
    setAnalytics(data ?? []);
    setFetchedUserId(id);
  };

  useEffect(() => {
    if (!selectedUser) {
      navigate(Routes.HOME);
      return;
    }

    if (selectedUser.id !== fetchedUserId) {
      fetchAnalytics(selectedUser.id);
    }
  }, [selectedUser]);

  if (!analytics) {
    return <CircularProgressIndicator className={styles.loading} size="medium" />;
  }

  const categories = analytics.filter((value) => value.type === "file").map((value) => value.name);

  const data = categories.reduce((acc: { [key: string]: typeof analytics }, category) => {
    acc[category] = analytics.filter((a) => a.name === category);
    return acc;
  }, {});

  if (Object.keys(data).length < 1) {
    return <Banner type="neutral" message="No statistics available" />;
  }

  return (
    <div className={styles.projects}>
      {Object.keys(data).map((name, index) => (
        <StatisticsCard key={name + index} name={name} data={data[name]} className={styles.card} />
      ))}
    </div>
  );
};
