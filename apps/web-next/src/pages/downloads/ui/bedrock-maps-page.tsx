import { Routes } from "@/shared/lib/utils";
import { permanentRedirect } from "next/navigation";

export const BedrockMapsPage = async () => {
  permanentRedirect(Routes.DOWNLOADS_BEDROCK_MAPS);
};
