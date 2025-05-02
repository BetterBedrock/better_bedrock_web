import { SectionDivider } from "~/components/section-divider";
import { About } from "./components/about";
import { Changelog } from "./components/changelog";
import { Creators } from "./components/creators";
import { Hero } from "./components/hero";

import sand from "~/assets/images/sand.png";
import stone from "~/assets/images/stone.png";
import deepslate from "~/assets/images/deepslate.png";
import netherrack from "~/assets/images/netherrack.png";

export const Home = () => (
  <main>
    <Hero />
    <SectionDivider image={sand} />
    <About sectionIndex={0} />
    <SectionDivider image={stone} />
    <About sectionIndex={1} />
    <SectionDivider image={deepslate} />
    <Changelog />
    <SectionDivider image={netherrack} />
    <Creators />
  </main>
);
