import { Routes } from "@/shared/model/routes";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Download Latest Better Bedrock Texture Pack",
};

export const LatestPage = () => {
  redirect(Routes.PROJECT_PREVIEW + "/better_bedrock_texture_pack");
};
