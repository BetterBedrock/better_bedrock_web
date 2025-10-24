import { AnalyticsDto } from "~/lib/api";

interface UseCalculateEstimatedProfit {
  data: {
    [key: string]: AnalyticsDto[];
  };
}

export const useCalculateEstimatedProfit = ({ data }: UseCalculateEstimatedProfit) => {
  const simplifiedData = Object.keys(data).reduce((acc: { [key: string]: number }, key) => {
    acc[key] = data[key].reduce((sum, p) => sum + p.value, 0) || 0;
    return acc;
  }, {});

  return ((simplifiedData["Ad Downloads"] ?? 0) / 1000) * 9;
};
