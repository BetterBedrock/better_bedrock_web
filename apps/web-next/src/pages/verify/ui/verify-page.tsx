import { Hero } from "@/pages/verify/ui/hero/hero";
import { cookies } from "next/headers";

interface VerifyPageProps {
  searchParams: Promise<{
    hash?: string;
  }>;
}

export const VerifyPage = async ({ searchParams }: VerifyPageProps) => {
  const hash = (await searchParams).hash;
  const cookieStore = await cookies();
  const voucher = cookieStore.get("voucher")?.value;

  return (
    <>
      <Hero hash={hash} voucher={voucher} />
      {/* <PartnerCard onlyImage /> */}
    </>
  );
};
