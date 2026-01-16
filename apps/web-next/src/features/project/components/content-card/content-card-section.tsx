"use client";

import BetterBedrockImage from "@/public/images/crosshair_backgrounds/25.webp";
import SideProjectsImage from "@/public/images/crosshair_backgrounds/27.webp";
import { FeaturedCardBanner } from "@/features/project/components/featured-card/featured-card-banner";
import { Routes } from "@/utils/routes";
import { useState } from "react";

import { SimpleProjectDto } from "@/lib/api";

import styles from "./featured-card.module.scss";
import { GridDownloadCard } from "@/components/grid-download-card";
import { Button } from "@/components/button";
import { BedrockText } from "@/components/bedrock-text";
import { CardBody, CardDivider } from "@/components/card";

interface ContentCardSectionProps {
  items: SimpleProjectDto[];
}

export const ContentCardSection = ({ items }: ContentCardSectionProps) => {
  const [current, setCurrent] = useState(0);
  const max = items.length;

  const handlePrev = () => setCurrent((prev) => (prev > 0 ? prev - 1 : max - 1));
  const handleNext = () => setCurrent((prev) => (prev < max - 1 ? prev + 1 : 0));

  return (
    <div className={styles.feedContainer}>
      <div className={styles.carouselWrapper}>
        <div className={styles.carouselViewport}>
          <div
            className={styles.carouselTrack}
            style={{
              transform: `translateX(-${current * 100}%)`,
              transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1)'
            }}
          >
            {/* todo: in the future, create code to display 5 items that are top views per week */}
            {items.map((item) => (
              <div className={styles.carouselItem} key={item.id}>
                <GridDownloadCard project={item} mode="view" />
              </div>
            ))}
          </div>
        </div>

      </div>
      <div className={styles.feedProgress}>
        <Button width="100%"
          type="white"
          center
          onClick={handlePrev}
          className={styles.arrowButton}>
          <BedrockText text="<" type="p" color="black" />
        </Button>
        <p>{current + 1} / {max}</p>
        <Button width="100%"
          type="white"
          center
          onClick={handleNext}
          className={styles.arrowButton}>
          <BedrockText text=">" type="p" color="black" />
        </Button>
      </div>
    </div>
  );
};
