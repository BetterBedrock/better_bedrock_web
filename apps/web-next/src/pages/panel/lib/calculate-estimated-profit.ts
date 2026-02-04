import { AnalyticsDto } from "@/shared/lib/openapi";

interface CalculateEstimatedProfitProps {
  data: {
    [key: string]: AnalyticsDto[];
  };
}

export const calculateEstimatedProfit = ({
  data,
}: CalculateEstimatedProfitProps) => {
  const simplifiedData = Object.keys(data).reduce(
    (acc: { [key: string]: number }, key) => {
      acc[key] = data[key].reduce((sum, p) => sum + p.value, 0) || 0;
      return acc;
    },
    {},
  );

  return ((simplifiedData["Ad Downloads"] ?? 0) / 1000) * 9;
};
