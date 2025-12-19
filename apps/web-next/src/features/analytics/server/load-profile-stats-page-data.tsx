"use server";

import { fetchUserAnalytics, simplifyAnalytics } from "@/lib/analytics";
import { fetchLoggedUser } from "@/lib/auth";
import { fetchUserByName } from "@/lib/user";
import { Routes } from "@/utils/routes";
import { notFound, redirect } from "next/navigation";

export const loadProfileStatsPageData = async (
  params?: Promise<{ name: string }>
) => {
  const loadedParams = await params;
  if (!loadedParams) {
    notFound();
  }

  const user = await fetchLoggedUser();
  const selectedUser = await fetchUserByName(loadedParams.name);

  if (!selectedUser) {
    notFound();
  }

  if (user?.id !== selectedUser.id && !user?.admin) {
    redirect(Routes.PROFILE + `/${name}/projects`);
  }

  const data = await fetchUserAnalytics(selectedUser.id);
  const simplified = simplifyAnalytics({ analytics: data });
  return simplified;
};
