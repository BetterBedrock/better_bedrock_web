import { Routes } from "@/shared/lib/utils";
import { permanentRedirect } from "next/navigation";

export const BedrockAddonsPage = async () => {
  permanentRedirect(Routes.DOWNLOADS_BEDROCK_ADDONS);
};
