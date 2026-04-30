import { Header } from "./header/header";
import { Resolved } from "./resolved/resolved";
import { Unresolved } from "./unresolved/unresolved";
import { HeroReportsPopup } from "@/pages/panel/ui/hero-reports/hero-reports-popup/hero-reports-popup";

export const HeroReports = () => (
  <>
    <HeroReportsPopup />
    <Header />
    <Unresolved />
    <Resolved />
  </>
);
