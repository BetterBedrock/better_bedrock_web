import React from "react";
import { AboutSectionElement, AboutCard } from "~/pages/home/components/about";

interface AboutListProps {
  direction?: "left" | "right";
  items: AboutSectionElement[];
}

export const AboutList = ({ items, direction = "left" }: AboutListProps) => {
  return (
    <>
      {items.map((item, index) => (
        <AboutCard direction={direction} item={item} index={index} />
      ))}
    </>
  );
};