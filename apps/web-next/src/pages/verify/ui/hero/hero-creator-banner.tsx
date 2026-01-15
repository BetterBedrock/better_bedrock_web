import Link from "next/link";
import { Banner } from "@/shared/ui/banner";

interface HeroCreatorBannerProps {
  creatorName?: string;
}

export const HeroCreatorBanner = ({ creatorName }: HeroCreatorBannerProps) => (
  <Banner
    type="info"
    message={
      <p style={{ textAlign: "center" }}>
        Monetize your content and earn revenue from ADs like @
        {creatorName ?? "Unknown"}. You can do the same - upload your project
        and start earning now!{" "}
        <Link
          href="/linkvertise"
          style={{ color: "inherit", textDecoration: "underline" }}
        >
          Check this tutorial to see how.
        </Link>
      </p>
    }
  />
);
