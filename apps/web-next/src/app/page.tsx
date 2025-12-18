import { SectionDivider } from "@/_components/section-divider";

import { About } from "./components/about/about";
import { Changelog } from "./components/changelog/changelog";
import { Creators } from "./components/creators/creators";
import { Hero } from "./components/hero/hero";

import sand from "@/public/images/sand.png";
import water from "@/public/images/water.png";
import stone from "@/public/images/stone.png";
import netherrack from "@/public/images/netherrack.png";

export default function Home() {
  return (
    <>
      <Hero />
      <SectionDivider image={water} />
      <About sectionIndex={0} />
      <SectionDivider image={sand} />
      <About sectionIndex={1} />
      <SectionDivider image={stone} />
      <Changelog />
      <SectionDivider image={netherrack} />
      <Creators />
    </>
  );
}
