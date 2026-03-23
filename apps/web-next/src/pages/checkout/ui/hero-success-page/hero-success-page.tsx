import { HeroSuccessPageAction } from "./hero-success-page-action";
import { HeroSuccessPageDescription } from "./hero-success-page-description";
import { HeroSuccessPageTitle } from "./hero-success-page-title";

export const HeroSuccessPage = async () => (
  <div>
    <HeroSuccessPageTitle />
    <HeroSuccessPageDescription />
    <HeroSuccessPageAction />
  </div>
);
