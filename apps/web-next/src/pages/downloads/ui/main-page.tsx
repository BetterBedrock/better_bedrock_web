import { Routes } from "@/shared/lib/utils";
import { permanentRedirect } from "next/navigation";

export const MainPage = async () => {
  permanentRedirect(Routes.DOWNLOADS_BEDROCK_MODS);
}