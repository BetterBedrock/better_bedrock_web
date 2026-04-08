import { activateVoucher } from "@/entities/checkout";
import { HeroSuccessPage } from "./hero-success-page/hero-success-page";
import { redirect } from "next/navigation";
import { Routes } from "@/shared/lib/utils";

export interface SuccessPageProps {
  searchParams: Promise<{ checkoutId: string }>;
}

export const SuccessPage = async ({ searchParams }: SuccessPageProps) => {
  const finalParams = await searchParams;
  const { data } = await activateVoucher(finalParams.checkoutId);

  if (!data) {
    redirect(Routes.CHECKOUT_CANCEL);
  }

  return <HeroSuccessPage code={data.code} />;
};
