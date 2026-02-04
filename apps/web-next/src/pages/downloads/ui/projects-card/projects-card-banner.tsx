import Link from "next/link";
import { Banner } from "@/shared/ui/banner";
import { Routes } from "@/shared/lib/utils";
import { fetchLoggedUser } from "@/entities/auth";

export const ProjectsCardBanner = async (
) => {
  const user = await fetchLoggedUser();
  const shouldShow = user?.linkvertiseId || user?.lootlabsLinkId ? false : true;

  if (!shouldShow) return null;

  return (
    <Banner
      type="info"
      message={
        <p style={{ textAlign: "center" }}>
          Creators keep 100% of ad revenue and benefit from our anti-bypass system
          to maximize earnings.{" "}
          <Link
            href={Routes.MONETIZATION}
            style={{ color: "inherit", textDecoration: "underline" }}
          >
            Check this tutorial to learn how!
          </Link>
        </p>
      }
    />
  );
}
