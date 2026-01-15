import { FAQ } from "./faq/faq";
import { Hero } from "./hero/hero";
import { Reasons } from "./reasons/reasons";
import { Tutorial } from "./tutorial/tutorial";

export const LinkvertisePage = async () => (
  <>
    <Hero />
    <Reasons />
    <FAQ />
    <Tutorial />
  </>
);
