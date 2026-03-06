import { SectionDivider } from "@/shared/ui/section-divider";

import { About } from "@/pages/home/ui/about/about";
import { Changelog } from "@/pages/home/ui/changelog/changelog";
import { Creators } from "@/pages/home/ui/creators/creators";
import { Hero } from "@/pages/home/ui/hero/hero";

import sand from "@/public/images/sand.png";
import water from "@/public/images/water.png";
import stone from "@/public/images/stone.png";
import netherrack from "@/public/images/netherrack.png";

export const HomePage = () => (
  <>
    <Hero />
    <SectionDivider image={water} />
    <Changelog />
    <SectionDivider image={sand} />
    <About sectionIndex={0} />
    <SectionDivider image={stone} />
    <About sectionIndex={1} />
    <SectionDivider image={netherrack} />
    <Creators />
  </>
);
