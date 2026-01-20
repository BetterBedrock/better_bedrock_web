import { Routes } from "@/shared/model/routes";
import { redirect } from "next/navigation";

export const PanelPage = () => {
  redirect(Routes.PANEL_DASHBOARD);
};
