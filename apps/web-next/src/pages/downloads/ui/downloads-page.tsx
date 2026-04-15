import { Routes } from "@/shared/lib/utils";
import { permanentRedirect } from "next/navigation";

export const DownloadsPage = () => {
  permanentRedirect(Routes.DOWNLOADS_BEDROCK_MODS);
}
