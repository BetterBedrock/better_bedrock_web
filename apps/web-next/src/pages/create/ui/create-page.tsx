import { Hero } from "./hero/hero";
import { guestRedirect } from "@/pages/create/lib/guest-redirect";

export const CreatePage = async () => {
  await guestRedirect();

  return <Hero />;
};
