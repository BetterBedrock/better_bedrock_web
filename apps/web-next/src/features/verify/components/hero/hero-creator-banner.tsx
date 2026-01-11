import Link from "next/link";
import { Banner } from "@/components/banner";

interface HeroCreatorBannerProps {
  creatorName?: string;
}

export const HeroCreatorBanner = ({ creatorName }: HeroCreatorBannerProps) => (
  <Banner
    type="info"
    message={
      <p style={{ textAlign: "center" }}>
        Did you know? @{creatorName ?? "Unknown"} just earned money from the ads you watched. You can do the same! Upload your project and start earning.{" "}
        <Link href="/linkvertise" style={{ color: "inherit", textDecoration: "underline" }}>
          Check this tutorial to see how.
        </Link>
      </p>
    }
  />
);