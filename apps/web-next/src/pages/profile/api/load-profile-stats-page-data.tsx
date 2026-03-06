"use server";

import { fetchLoggedUser } from "@/entities/auth";
import { fetchUserByName } from "@/entities/user";
import { fetchUserAnalytics, simplifyAnalytics } from "@/entities/analytic";
import { Routes } from "@/shared/lib/utils";
import { notFound, redirect } from "next/navigation";

export const loadProfileStatsPageData = async (
  params?: Promise<{ name: string }>,
) => {
  const loadedParams = await params;
  if (!loadedParams) {
    notFound();
  }

  const name = decodeURIComponent(loadedParams.name);
  const user = await fetchLoggedUser();
  const selectedUser = await fetchUserByName(name);

  if (!selectedUser) {
    notFound();
  }

  if (user?.id !== selectedUser.id && !user?.admin) {
    redirect(Routes.PROFILE + `/${selectedUser.name}/projects`);
  }

  const data = await fetchUserAnalytics(selectedUser.id);
  const simplified = simplifyAnalytics({ analytics: data });
  return simplified;
};
