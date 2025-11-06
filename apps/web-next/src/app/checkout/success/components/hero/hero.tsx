import { SuccessPageProps } from "@/app/checkout/success";
import { HeroAction, HeroDescription, HeroTitle } from ".";
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
