"use client";

import { fetchLiveCount } from "@/entities/analytic/api/fetch-live-count";
import { StatisticsCard } from "@/widgets/statistics-list";
import { useEffect, useState } from "react";

export const StatisticsLive = () => {
  const [online, setOnline] = useState<number>(0);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await fetchLiveCount();
      setOnline(data.online);
    };

    fetch();
    const interval = setInterval(fetch, 1_000);
    return () => clearInterval(interval);
  }, []);

  return <StatisticsCard name="Live User Count" data={online} />;
};
