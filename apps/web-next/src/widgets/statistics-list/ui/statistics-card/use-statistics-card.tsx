import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { HTMLAttributes } from "react";
import { AnalyticsDto } from "@/shared/lib/openapi";

dayjs.extend(utc);
dayjs.extend(advancedFormat);

export interface StatisticsCardProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  data?: AnalyticsDto[] | number;
  range?: string;
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

type RangeUnit = "day" | "month" | "year";

interface RangeConfig {
  unit: RangeUnit;
  labels: string[]; // label strings used as keys
  start: dayjs.Dayjs | null;
  categoryName: string;
  stepDays?: number; // present when days should be grouped (e.g. 3 for 30d)
}

/**
 * Helper to format a bucket label from start and end days.
 * Always uses the full "MMM Do" for clarity (e.g. "Mar 1 - Mar 3").
 */
const formatRangeLabel = (start: dayjs.Dayjs, end: dayjs.Dayjs) =>
  `${start.format("MMM Do")} - ${end.format("MMM Do")}`;

export const getRangeConfig = (
  data: AnalyticsDto[],
  range: string,
): RangeConfig | undefined => {
  const now = dayjs().utc();

  switch (range) {
    case "7d":
    case "14d": {
      const days = parseInt(range, 10);
      const labels = Array.from({ length: days }).map((_, i) =>
        now.subtract(days - 1 - i, "day").format("MMM Do"),
      );
      return {
        unit: "day",
        labels,
        start: now.subtract(days - 1, "day").startOf("day"),
        categoryName: range,
      };
    }

    case "30d": {
      // Group 30 days into 3-day buckets (10 buckets)
      const days = 30;
      const stepDays = 3;
      const buckets = Math.ceil(days / stepDays); // 10

      const start = now.subtract(days - 1, "day").startOf("day"); // inclusive start (30 days ago)
      const labels = Array.from({ length: buckets }).map((_, i) => {
        const bucketStart = start.add(i * stepDays, "day");
        const bucketEnd = bucketStart.add(stepDays - 1, "day");
        return formatRangeLabel(bucketStart, bucketEnd);
      });

      return {
        unit: "day",
        labels,
        start,
        categoryName: range,
        stepDays,
      };
    }

    case "6m": {
      const months = 6;
      const labels = Array.from({ length: months }).map((_, i) =>
        now.subtract(months - 1 - i, "month").format("MMM YYYY"),
      );
      return {
        unit: "month",
        labels,
        start: now.subtract(months - 1, "month").startOf("month"),
        categoryName: range,
      };
    }

    case "ytd": {
      const start = now.startOf("year");
      const months = now.month() + 1;
      const labels = Array.from({ length: months }).map((_, i) =>
        start.add(i, "month").format("MMM"),
      );
      return {
        unit: "month",
        labels,
        start,
        categoryName: range,
      };
    }

    case "all": {
      const years = Array.from(
        new Set(data.map((d) => dayjs(d.date).utc().year())),
      ).sort();
      const labels = years.map((y) => y.toString());
      return {
        unit: "year",
        labels,
        start: null,
        categoryName: range,
      };
    }

    default:
      return undefined;
  }
};

export const transformToFData = (
  data: AnalyticsDto[],
  range: string,
): FData => {
  const config = getRangeConfig(data, range);
  if (!config) {
    return { categories: [{ name: range, pieces: [] }] };
  }

  const { unit, labels, start, categoryName, stepDays } = config;
  const map = new Map<string, number>();
  labels.forEach((lbl) => map.set(lbl, 0));

  // Helper that formats the correct bucket label for a given date when using day buckets with stepDays
  const getBucketLabelForDate = (date: dayjs.Dayjs) => {
    if (!start) return date.format("MMM Do");

    const diffDays = date.startOf("day").diff(start.startOf("day"), "day");
    if (diffDays < 0) return null; // before start
    const bucketIndex = Math.floor(diffDays / (stepDays ?? 1));
    const bucketStart = start.add(bucketIndex * (stepDays ?? 1), "day");
    const bucketEnd = bucketStart.add((stepDays ?? 1) - 1, "day");
    return formatRangeLabel(bucketStart, bucketEnd);
  };

  data.forEach((item) => {
    const date = dayjs(item.date).utc();
    if (!date.isValid()) return;

    // If there's a start and the item is before the start, skip
    if (start && date.isBefore(start, "day")) return;

    let key: string | null = null;

    if (unit === "day") {
      if (stepDays && stepDays > 1) {
        // grouped day buckets (e.g. 3-day buckets for 30d)
        key = getBucketLabelForDate(date);
      } else {
        key = date.format("MMM Do");
      }
    } else if (unit === "month") {
      key = range === "6m" ? date.format("MMM YYYY") : date.format("MMM");
    } else {
      key = date.year().toString();
    }

    if (!key) return;
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
