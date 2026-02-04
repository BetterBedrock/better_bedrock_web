import { HeroSuccessPage } from "./hero-success-page/hero-success-page";

export interface SuccessPageProps {
  searchParams: Promise<{ checkoutId: string }>;
}

export const SuccessPage = async ({ searchParams }: SuccessPageProps) => (
  <HeroSuccessPage searchParams={searchParams} />
);
