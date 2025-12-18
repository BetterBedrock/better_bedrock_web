import { Routes } from "@/utils/routes";
import { redirect } from "next/navigation";

interface ProfileProps {
  params: Promise<{ name: string }>;
}

export default async function Profile({ params }: ProfileProps) {
  const loadedParams = await params;
  redirect(Routes.PROFILE + `/${loadedParams.name}/projects`);
}
