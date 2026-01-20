import { Routes } from "@/shared/model/routes";
import { redirect } from "next/navigation";

interface ProfilePageProps {
  params: Promise<{ name: string }>;
}

export const ProfilePage = async ({ params }: ProfilePageProps) => {
  const loadedParams = await params;
  redirect(Routes.PROFILE + `/${loadedParams.name}/projects`);
};
