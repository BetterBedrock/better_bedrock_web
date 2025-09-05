import { useNavigate, useOutletContext } from "react-router-dom";
import { styles } from ".";
import { Routes } from "~/utils/routes";
import { useState, useEffect } from "react";
import { SimpleUserDto, AnalyticsDto } from "~/lib/api";
import { useAnalytics } from "~/providers/analytics";
import { StatisticsCard } from "~/components/bedrock/statistics-card";
import { BedrockText } from "~/components/bedrock/bedrock-text";

export const Stats = () => {
  const navigate = useNavigate();
  const { selectedUser } = useOutletContext<{ selectedUser: SimpleUserDto }>();
  const { fetchUserAnalytics } = useAnalytics();

  const [analytics, setAnalytics] = useState<AnalyticsDto[]>([]);

  useEffect(() => {
    if (!selectedUser) {
      navigate(Routes.HOME);
      return;
    }
    fetchUserAnalytics().then((data) => setAnalytics(data ?? []));
  }, []);

  console.log({ analytics });

  const categories = analytics.filter((value) => value.type === "file").map((value) => value.name);

  const data = categories.reduce((acc: { [key: string]: typeof analytics }, category) => {
    acc[category] = analytics.filter((a) => a.name === category);
    return acc;
  }, {});

  return (
    <div className={styles.list}>
      <div className={styles.projects}>
        {Object.keys(data).map((name) => (
          <StatisticsCard name={name} data={data[name]} className={styles.card} />
        ))}
      </div>
              {Object.keys(data).length < 1 && <BedrockText text="No statistics available" type="p" textAlign="center" color="white" extraClassName={styles.text}/>}
    </div>
  );
};
