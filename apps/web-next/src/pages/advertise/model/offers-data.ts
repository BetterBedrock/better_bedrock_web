import { ButtonType } from "@/shared/ui/button/button";

export type PlanDuration = "weekly" | "monthly";

export interface OfferBenefit {
  label: string;
  value: string;
}

export interface OfferData {
  id: string;
  title: string;
  description: string;
  weeklyPrice?: number;
  monthlyPrice?: number;
  monthlySalePrice?: number;
  benefits: OfferBenefit[];
  color: ButtonType;
  tags?: string[];
}

export const offersData: OfferData[] = [
  {
    id: "basic",
    title: "BASIC PLAN",
    description:
      "Smart choice for upcoming communities, new servers, and independent creators.",
    weeklyPrice: 30,
    monthlyPrice: 120,
    monthlySalePrice: 100,
    benefits: [
      { label: "Essential Visibility", value: "Project & Information pages (2/4)." },
      {
        label: "High Traffic",
        value: "Captures ~40% of total site visitors.",
      },
      { label: "Steady Growth", value: "Perfect for brand awareness and testing the waters." },
      {
        label: "Partner Status",
        value: "PARTNER role & top member list spot.",
      },
    ],
    color: "white",
    tags: ["STARTER"],
  },
  {
    id: "standard",
    title: "STANDARD PLAN",
    description:
      "The highest ROI for hosting services, marketplaces, and established networks.",
    weeklyPrice: 50,
    monthlyPrice: 200,
    monthlySalePrice: 160,
    benefits: [
      {
        label: "Premium Placements",
        value: "Download, Projects, and Information pages (3/4).",
      },
      {
        label: "Massive Traffic",
        value: "Unlocks the critical Download screen, capturing ~80% of total traffic.",
      },
      {
        label: "Discord Reach",
        value: "1 dedicated alert post to +70k members (Monthly only).",
      },
      {
        label: "Partner Status",
        value: "PARTNER role & top member list spot.",
      },
    ],
    color: "green",
    tags: ["BEST VALUE", "MOST POPULAR"],
  },
  {
    id: "exclusive",
    title: "EXCLUSIVE PLAN",
    description:
      "The ultimate choice for market leaders seeking total brand dominance.",
    benefits: [
      {
        label: "Total Takeover",
        value:  "All pages (4/4 - Home, Download, Projects, Information) + Static Banner in Home.",
      },
      {
        label: "Home Page Spotlight",
        value: "Exclusive, static banner placed right at the site's main entry point.",
      },
      {
        label: "Maximum Reach",
        value: "Guaranteed exposure to 99% of our total user base.",
      },
      {
        label: "Massive Discord Impact",
        value: "Direct promotional posts to +70k members.",
      },
      {
        label: "VIP Status",
        value: "EXCLUSIVE PARTNER role & top spot on member list.",
      },
    ],
    color: "gold",
    tags: ["ELITE"],
  },
];
