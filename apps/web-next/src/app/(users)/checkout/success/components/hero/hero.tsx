import { SuccessPageProps } from "@/app/(users)/checkout/success/page";
import { HeroAction } from "./hero-action";
import { HeroDescription } from "./hero-description";
import { HeroTitle } from "./hero-title";
import { activateVoucher } from "@/_lib/checkout/active-voucher";
import { redirect } from "next/navigation";
import { Routes } from "@/utils/routes";
import { cookies } from "next/headers";

export const Hero = async ({ searchParams }: SuccessPageProps) => {
  const cookie = await cookies();
  const fetchedParams = await searchParams;
  const voucher = await activateVoucher(fetchedParams.checkoutId);
  if (!voucher) {
    redirect(Routes.CHECKOUT_CANCEL);
  }

  cookie.set("voucher", JSON.stringify(voucher), { path: "/" });

  return (
    <div>
      <HeroTitle />
      <HeroDescription />
      <HeroAction />
    </div>
  );
};
