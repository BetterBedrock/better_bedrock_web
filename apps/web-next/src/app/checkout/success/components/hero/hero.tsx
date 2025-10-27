import { useSearchParams } from "react-router-dom";
import { HeroAction, HeroDescription, HeroTitle, useActiveVoucher } from ".";

export const Hero = () => {
  const [searchParams, _] = useSearchParams();
  useActiveVoucher({ checkoutId: searchParams.get("checkoutId") || "" });

  return (
    <div>
      <HeroTitle />
      <HeroDescription />
      <HeroAction />
    </div>
  );
};
