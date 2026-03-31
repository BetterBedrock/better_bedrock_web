import { Routes } from "@/shared/lib/utils";
import { permanentRedirect } from "next/navigation";

export const BedrockTexturePacksPage = async () => {
  permanentRedirect(Routes.DOWNLOADS_BEDROCK_TEXTURE_PACKS);
};
