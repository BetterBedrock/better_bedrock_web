import { AboutCard } from "./about-card";
import { AboutSectionElement } from "./about-data";

interface AboutListProps {
  direction?: "left" | "right";
  items: AboutSectionElement[];
}

export const AboutList = ({ items, direction = "left" }: AboutListProps) =>
  items.map((item, index) => (
    <AboutCard key={index} direction={direction} item={item} index={index} />
  ));
