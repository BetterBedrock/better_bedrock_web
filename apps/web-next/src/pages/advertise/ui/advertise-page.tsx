import { Booking } from "./booking/booking";
import { FAQ } from "./faq/faq";
import { Hero } from "./hero/hero";
import { Plans } from "./plans/plans";
import { TermsActions } from "./terms-actions/terms-actions";

export const AdvertisePage = () => (
  <>
    <Hero />
    <Plans />
    <Booking />
    <FAQ />
    <TermsActions />
  </>
);
