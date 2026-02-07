import { ButtonType } from "@/shared/ui/button/button";

export type PlanDuration = "weekly" | "monthly";

export interface OfferBenefit {
  label: string;
  value: string;
}

export interface OfferData {
  title: string;
  description: string;
  weeklyPrice: number;
  monthlyPrice: number;
  monthlySalePrice: number;
  benefits: OfferBenefit[];
  color: ButtonType;
}

export const offersData: OfferData[] = [
  {
    title: "BASIC PLAN",
    description:
      "Smart choice for growing communities, new servers and creators.",
    weeklyPrice: 40,
    monthlyPrice: 160,
    monthlySalePrice: 130,
    benefits: [
      { label: "Essential Visibility", value: "Project & Information pages." },
      {
        label: "High Traffic",
        value: "Captures ~60% of total site visitors.",
      },
      { label: "Budget Friendly", value: "Best CPM for Growth." },
    ],
    color: "white",
  },
  {
    title: "STANDARD PLAN",
    description:
      "High-performance tier designed for Hosting Services & Marketplaces demanding conversion.",
    weeklyPrice: 60,
    monthlyPrice: 240,
    monthlySalePrice: 200,
    benefits: [
      { label: "High-Intent Placements", value: "Download, Projects, Info" },
      {
        label: "Top ROI",
        value: "Ads displayed at the critical download moment (90% reach).",
      },
      {
        label: "Discord Reach",
        value: "Silent post to +70k members (Monthly only)",
      },
      {
        label: "Partner Status",
        value: "PARTNER role & top member list spot.",
      },
    ],
    color: "green",
  },
  {
    title: "EXCLUSIVE PLAN",
    description:
      "The ultimate choice for market leaders seeking total brand dominance.",
    weeklyPrice: 120,
    monthlyPrice: 480,
    monthlySalePrice: 380,
    benefits: [
      {
        label: "Total Takeover",
        value: "All pages + Static Banner in Home (No Rotation).",
      },
      {
        label: "Maximum ROI",
        value: "Impossible to miss ads reaching 99% of all users.",
      },
      {
        label: "Massive Discord Impact",
        value:
          "Direct @everyone promotional post to +70k members (Monthly only)",
      },
      {
        label: "VIP Status",
        value: "EXCLUSIVE role & top spot on member list.",
      },
    ],
    color: "gold",
  },
];
