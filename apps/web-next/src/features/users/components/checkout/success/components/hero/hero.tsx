import { SuccessPageProps } from "@/app/(users)/checkout/success/page";
import { HeroAction } from "./hero-action";
import { HeroDescription } from "./hero-description";
import { HeroTitle } from "./hero-title";
import { activateVoucher } from "@/features/project/hooks/use-active-voucher";
import { redirect } from "next/navigation";
import { Routes } from "@/utils/routes";

export const Hero = async ({ searchParams }: SuccessPageProps) => {
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
