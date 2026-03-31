import { Routes } from "@/shared/lib/utils";
import { permanentRedirect } from "next/navigation";

export const BedrockOthersPage = async () => {
  permanentRedirect(Routes.DOWNLOADS_BEDROCK_OTHERS);
};
