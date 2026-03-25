import { Routes } from "@/shared/lib/utils";
import { permanentRedirect } from "next/navigation";

export const BedrockSkinPacksPage = async () => {
  permanentRedirect(Routes.DOWNLOADS_BEDROCK_SKIN_PACKS);
};
