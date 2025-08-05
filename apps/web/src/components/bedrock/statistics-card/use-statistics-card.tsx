import { AnalyticsDto } from "~/lib/api";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { HTMLAttributes } from "react";

dayjs.extend(utc);
dayjs.extend(advancedFormat);

export type RangeOption = "7d" | "14d" | "30d" | "6m" | "ytd" | "all";
export interface StatisticsCardProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  data?: AnalyticsDto[] | number;
  range?: RangeOption;
  showGraph?: boolean;
  suffix?: string;
}

interface Category {
  name: string;
  pieces: { name: string; value: number }[];
}

export interface FData {
  categories: Category[];
}

export const getRangeConfig = (data: AnalyticsDto[], range: RangeOption) => {
  const now = dayjs().utc();

  switch (range) {
    case "7d":
    case "14d":
    case "30d": {
      const days = parseInt(range, 10);
      const labels = Array.from({ length: days }).map((_, i) =>
        now.subtract(days - 1 - i, "day").format("MMM Do"),
      );
      return {
        unit: "day" as const,
        labels,
        start: now.subtract(days - 1, "day").startOf("day"),
        categoryName: `Last ${days} Days`,
      };
    }
    case "6m": {
      const months = 6;
      const labels = Array.from({ length: months }).map((_, i) =>
        now.subtract(months - 1 - i, "month").format("MMM YYYY"),
      );
      return {
        unit: "month" as const,
        labels,
        start: now.subtract(months - 1, "month").startOf("month"),
        categoryName: "Last 6 Months",
      };
    }
    case "ytd": {
      const start = now.startOf("year");
      const months = now.month() + 1;
      const labels = Array.from({ length: months }).map((_, i) =>
        start.add(i, "month").format("MMM"),
      );
      return {
        unit: "month" as const,
        labels,
        start,
        categoryName: "This Year",
      };
    }
    case "all": {
      const years = Array.from(new Set(data.map((d) => dayjs(d.date).utc().year()))).sort();
      const labels = years.map((y) => y.toString());
      return {
        unit: "year" as const,
        labels,
        start: null,
        categoryName: "All Time",
      };
    }
  }
};

export const transformToFData = (data: AnalyticsDto[], range: RangeOption = "7d"): FData => {
  const { unit, labels, start, categoryName } = getRangeConfig(data, range);
  const map = new Map<string, number>();
  labels.forEach((lbl) => map.set(lbl, 0));

  data.forEach((item) => {
    const date = dayjs(item.date).utc();
    if (!date.isValid()) return;
    if (start && date.isBefore(start, unit)) return;

    let key: string;
    if (unit === "day") {
      key = date.format("MMM Do");
    } else if (unit === "month") {
      key = range === "6m" ? date.format("MMM YYYY") : date.format("MMM");
    } else {
      key = date.year().toString();
    }

    if (map.has(key)) {
      map.set(key, map.get(key)! + item.value);
    }
  });

  return {
    categories: [
      {
        name: categoryName,
        pieces: labels.map((lbl) => ({ name: lbl, value: map.get(lbl) || 0 })),
      },
    ],
  };
};
