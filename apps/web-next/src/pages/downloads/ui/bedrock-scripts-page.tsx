import { Routes } from "@/shared/lib/utils";
import { permanentRedirect } from "next/navigation";

export const BedrockScriptsPage = async () => {
  permanentRedirect(Routes.DOWNLOADS_BEDROCK_SCRIPTS);
};
