import { Header } from "./header/header";
import { Resolved } from "./resolved/resolved";
import { Unresolved } from "./unresolved/unresolved";

export const HeroReports = () => (
  <>
    <Header />
    <Unresolved />
    <Resolved />
  </>
);
