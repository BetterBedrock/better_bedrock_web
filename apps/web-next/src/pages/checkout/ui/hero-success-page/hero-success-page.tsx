import { HeroSuccessPageAction } from "./hero-success-page-action";
import { HeroSuccessPageDescription } from "./hero-success-page-description";
import { HeroSuccessPageTitle } from "./hero-success-page-title";
import { redirect } from "next/navigation";
import { Routes } from "@/shared/lib/utils";
import { activateVoucher } from "@/entities/checkout";

export interface HeroSuccessPageProps {
  searchParams: Promise<{ checkoutId: string }>;
}

export const HeroSuccessPage = async ({
  searchParams,
}: HeroSuccessPageProps) => {
  const fetchedParams = await searchParams;
  const voucher = await activateVoucher(fetchedParams.checkoutId);
  if (!voucher) {
    redirect(Routes.CHECKOUT_CANCEL);
  }

  return (
    <div>
      <HeroSuccessPageTitle />
      <HeroSuccessPageDescription />
      <HeroSuccessPageAction />
    </div>
  );
};
