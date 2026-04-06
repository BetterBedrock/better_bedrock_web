"use client";

import { useEffect } from "react";
import { HeroSuccessPageAction } from "./hero-success-page-action";
import { HeroSuccessPageDescription } from "./hero-success-page-description";
import { HeroSuccessPageTitle } from "./hero-success-page-title";
import { setCookieVoucher } from "@/entities/checkout";

interface HeroSuccessPageProps {
  code: string;
}

export const HeroSuccessPage = ({ code }: HeroSuccessPageProps) => {
  useEffect(() => {
    setCookieVoucher(code);
  }, [code]);

  return (
    <div>
      <HeroSuccessPageTitle />
      <HeroSuccessPageDescription />
      <HeroSuccessPageAction />
    </div>
  );
};
