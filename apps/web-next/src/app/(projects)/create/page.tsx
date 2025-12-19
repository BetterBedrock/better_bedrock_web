import { Hero } from "@/features/project/components/create/hero/hero";
import { guestRedirect } from "@/features/users/server/guest-redirect";

export default async function Creator() {
  await guestRedirect();

  return (
    <>
      <Hero />
    </>
  );
}
