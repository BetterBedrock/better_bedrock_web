import { Routes } from "@/shared/lib/utils";
import { redirect } from "next/navigation";

export const PanelPage = () => {
  redirect(Routes.PANEL_DASHBOARD);
};
