import { PartnerCard } from "@/components/partner-card/partner-card";
import { Hero } from "@/features/verify/components/hero/hero";

interface VerifyProps {
  searchParams: Promise<{
    hash?: string;
  }>;
}

export default async function Verify({ searchParams }: VerifyProps) {
  const hash = (await searchParams).hash;

  return (
    <>
    {/* todo: zrobic lepszy layout, hero na dole wrzucic w Card, CardBody itd. */}
      <PartnerCard />
      <Hero hash={hash} />
    </>
  );
}
