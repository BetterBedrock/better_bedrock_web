import { HeroAction } from "./hero-action";
import { HeroDescription } from "./hero-description";
import { HeroTitle } from "./hero-title";
import { redirect } from "next/navigation";
import { Routes } from "@/shared/model/routes";
import { activateVoucher } from "@/entities/voucher/activate-voucher";

export interface HeroProps {
  searchParams: Promise<{ checkoutId: string }>;
}

export const Hero = async ({ searchParams }: HeroProps) => {
  const fetchedParams = await searchParams;
  const voucher = await activateVoucher(fetchedParams.checkoutId);
  if (!voucher) {
    redirect(Routes.CHECKOUT_CANCEL);
  }

  return (
    <div>
      <HeroTitle />
      <HeroDescription />
      <HeroAction />
    </div>
  );
};
