import { Routes } from "@/shared/lib/utils";
import { permanentRedirect } from "next/navigation";

export const BedrockModsPage = async () => {
  permanentRedirect(Routes.DOWNLOADS_BEDROCK_MODS);
};
