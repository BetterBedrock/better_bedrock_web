import { SectionDivider } from "~/components/section-divider";
import { About } from "./components/about";
import { Changelog } from "./components/changelog";
import { Creators } from "./components/creators";
import { Hero } from "./components/hero";

import sand from "~/assets/images/sand.png";
import water from "~/assets/images/water.png";
import stone from "~/assets/images/stone.png";
// import deepslate from "~/assets/images/deepslate.png";
import netherrack from "~/assets/images/netherrack.png";

export const Home = () => (
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
