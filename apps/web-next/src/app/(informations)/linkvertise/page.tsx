import { FAQ } from "@/features/linkvertise/components/faq/faq";
import { Hero } from "@/features/linkvertise/components/hero/hero";
import { Reasons } from "@/features/linkvertise/components/reasons/reasons";
import { Tutorial } from "@/features/linkvertise/components/tutorial/tutorial";

export default function Linkvertise() {
  return (
    <>
      <Hero />
      <Reasons />
      <FAQ />
      <Tutorial />
    </>
  );
}
