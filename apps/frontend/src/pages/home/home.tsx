import { Hero } from "components/home/hero";
import { Creators } from "components/home/creators";
import { About } from "components/home/about";
import { Changelog } from "components/home/changelog";

import styles from "./home.module.css";
import Footer from "components/bedrock/Footer";
import { DynamicPage } from "components/bedrock/page-container/dynamic-page";
import { DynamicPageItem } from "components/bedrock/page-container/dynamic-page-item";

export const Home = () => (
  <DynamicPage backgroundUrl={require("../../assets/images/crosshair_backgrounds/1.png")}>
    <Hero />
    <About sectionIndex={0} />
    <About sectionIndex={1} />
    <Changelog />
    <Creators />

    {/* <DynamicPageItem
      backgroundUrl={require("../../assets/images/crosshair_backgrounds/2.png")}>
      <h1 style={{ backgroundColor: "green" }}>elo2</h1>
    </DynamicPageItem> */}

  </DynamicPage >
);
