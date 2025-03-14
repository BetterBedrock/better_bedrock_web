import React from "react";
import { HeroHeader } from "./hero-header";
import { HeroTrailer } from "./hero-trailer";
import { HeroBottomText } from "./hero-bottom-text";
import { DynamicPageItem } from "components/bedrock/page-container/dynamic-page-item";

import styles from "./hero.module.css";

export const Hero = () => (
  <DynamicPageItem
    backgroundUrl={require("../../../assets/images/crosshair_backgrounds/9.png")}>
    <section id={styles.homeSection}>
      <HeroHeader />
      <HeroTrailer />
      <HeroBottomText />
    </section>
  </DynamicPageItem >
);
