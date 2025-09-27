// import { StatisticsCard } from "~/components/bedrock/statistics-card";
import { StatisticsCard } from "~/components/bedrock/statistics-card";
import { styles, useStatistics } from ".";
import { CircularProgressIndicator } from "~/components/bedrock/circular-progress-indicator";

export const Statistics = () => {
  const { analytics } = useStatistics();

  if (!analytics) {
    return <CircularProgressIndicator center />;
  }

  const categories = analytics.filter((value) => value.type === "file").map((value) => value.name);

  const data = categories.reduce((acc: { [key: string]: typeof analytics }, category) => {
    acc[category] = analytics.filter((a) => a.name === category);
    return acc;
  }, {});

  return (
    <div className={styles.data}>
      <div className={styles.list}>
        {Object.keys(data).map((name) => (
          <StatisticsCard name={name} data={data[name]} className={styles.card} />
        ))}
      </div>
    </div>
  );
};
