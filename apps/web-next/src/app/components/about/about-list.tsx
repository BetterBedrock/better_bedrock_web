import { AboutSectionElement, AboutCard } from ".";

interface AboutListProps {
  direction?: "left" | "right";
  items: AboutSectionElement[];
}

export const AboutList = ({ items, direction = "left" }: AboutListProps) =>
  items.map((item, index) => (
    <AboutCard key={index} direction={direction} item={item} index={index} />
  ));
