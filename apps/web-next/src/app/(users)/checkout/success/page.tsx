import { Hero } from "@/features/users/components/checkout/success/components/hero/hero";

export interface SuccessPageProps {
  searchParams: Promise<{ checkoutId: string }>;
}

export default function Success({ searchParams }: SuccessPageProps) {
  return (
    <>
      <Hero searchParams={searchParams} />
    </>
  );
}
