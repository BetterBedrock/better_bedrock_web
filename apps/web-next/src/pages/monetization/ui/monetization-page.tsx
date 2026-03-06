import { FAQ } from "./faq/faq";
import { Hero } from "./hero/hero";
import { Reasons } from "./reasons/reasons";
import { TermsActions } from "./terms-actions/terms-actions";
import { Tutorial } from "./tutorial/tutorial";

export const MonetizationPage = async () => (
  <>
    <Hero />
    <Tutorial />
    <Reasons />
    <FAQ />
    <TermsActions />
  </>
);
