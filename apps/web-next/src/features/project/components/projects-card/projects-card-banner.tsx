import Link from "next/link";
import { Banner } from "@/components/banner";

export const ProjectsCardBanner = () => (
  <Banner
    type="info"
    message={
      <p style={{ textAlign: "center" }}>
        Creators keep 100% of ad revenue and benefit from our anti-bypass system
        to maximize earnings.{" "}
        <Link href="/linkvertise" style={{ color: "inherit", textDecoration: "underline" }}>
          Watch the tutorial to learn how!
        </Link>
      </p>
    }
  />
);
