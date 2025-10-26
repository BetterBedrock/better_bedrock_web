import { SectionDivider } from "@/app/_components/section-divider";

import { About } from "./components/about";
import { Changelog } from "./components/changelog";
import { Creators } from "./components/creators";
import { Hero } from "./components/hero";

import sand from "@/public/images/sand.png";
import water from "@/public/images/water.png";
import stone from "@/public/images/stone.png";
import netherrack from "@/public/images/netherrack.png";

export default function Home() {
  return (
    <main>
      <Hero />
      <SectionDivider image={water} />
      <About sectionIndex={0} />
      <SectionDivider image={sand} />
      <About sectionIndex={1} />
      <SectionDivider image={stone} />
      <Changelog />
      <SectionDivider image={netherrack} />
      <Creators />
    </main>
  );
}
