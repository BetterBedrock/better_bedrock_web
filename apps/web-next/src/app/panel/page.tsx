import { Routes } from "@/utils/routes";
import { redirect } from "next/navigation";

export default function PanelPage() {
  redirect(Routes.PANEL_DASHBOARD);
}
