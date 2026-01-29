import { Hero } from "@/pages/verify/ui/hero/hero";
import { PartnerCard } from "@/pages/verify/ui/hero/partner-card";

interface VerifyPageProps {
  searchParams: Promise<{
    hash?: string;
  }>;
}

export const VerifyPage = async ({ searchParams }: VerifyPageProps) => {
  const hash = (await searchParams).hash;

  return (
    <>
      <Hero hash={hash} />
      {/* <PartnerCard onlyImage /> */}
    </>
  );
};
