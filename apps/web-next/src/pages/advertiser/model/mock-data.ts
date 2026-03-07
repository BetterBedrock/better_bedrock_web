export type AdPlan = "EXCLUSIVE" | "STANDARD" | "BASIC";
export type AdStatus = "PENDING" | "ACTIVE" | "REJECTED";

export interface MockAdCampaign {
  id: string;
  userId: string;
  plan: AdPlan;
  status: AdStatus;
  rejectionReason?: string;
  imageUrl: string;
  targetUrl: string;
  impressions: number;
  clicks: number;
  createdAt: string;
  expiresAt?: string;
}

export const MOCK_USER_CAMPAIGN: MockAdCampaign = {
  id: "cuid-mock-id-123",
  userId: "user_123",
  plan: "STANDARD",
  status: "ACTIVE", // You can change this to PENDING or REJECTED to test
  rejectionReason: undefined,
  imageUrl: "https://via.placeholder.com/1200x300.png?text=Banners+Preview",
  targetUrl: "https://betterbedrock.com/example",
  impressions: 15420,
  clicks: 843,
  createdAt: new Date().toISOString(),
  expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(), 
};

export const MOCK_CAMPAIGNS: MockAdCampaign[] = [
  MOCK_USER_CAMPAIGN,
  {
    id: "cuid-mock-id-124",
    userId: "user_456",
    plan: "EXCLUSIVE",
    status: "PENDING",
    imageUrl: "https://via.placeholder.com/1200x300.png?text=Pending+Banner",
    targetUrl: "https://example.com/pending",
    impressions: 0,
    clicks: 0,
    createdAt: new Date().toISOString(),
  },
  {
    id: "cuid-mock-id-125",
    userId: "user_789",
    plan: "BASIC",
    status: "REJECTED",
    rejectionReason: "Logo contains NSFW materials.",
    imageUrl: "https://via.placeholder.com/1200x300.png?text=Rejected+Banner",
    targetUrl: "https://example.com/rejected",
    impressions: 0,
    clicks: 0,
    createdAt: new Date().toISOString(),
  }
];
