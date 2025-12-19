import { Routes } from "@/utils/routes";
import { redirect } from "next/navigation";

export default function Latest() {
  redirect(Routes.PROJECT_PREVIEW + "/better_bedrock_texture_pack");
}
