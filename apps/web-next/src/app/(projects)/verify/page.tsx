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
      <Hero hash={hash} />
    </>
  );
}
