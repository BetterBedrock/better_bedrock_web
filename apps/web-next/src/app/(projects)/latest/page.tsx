import { Routes } from "@/utils/routes";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Download Latest Better Bedrock Texture Pack",
};

export default function Latest() {
  redirect(Routes.PROJECT_PREVIEW + "/better_bedrock_texture_pack");
}
