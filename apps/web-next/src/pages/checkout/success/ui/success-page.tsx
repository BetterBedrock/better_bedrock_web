import { Hero } from "./hero/hero";

export interface SuccessPageProps {
  searchParams: Promise<{ checkoutId: string }>;
}

export const SuccessPage = async ({ searchParams }: SuccessPageProps) => (
  <Hero searchParams={searchParams} />
);
