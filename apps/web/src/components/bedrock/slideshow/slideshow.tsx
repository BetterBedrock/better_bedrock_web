import { Children, useEffect, useState } from "react";
import styles from "./slideshow.module.css";
import clsx from "clsx";

interface SlideshowProps {
  children: React.ReactNode;
}

export const Slideshow = ({ children }: SlideshowProps) => {
  // const items = Children.count(children);
  const items = Children.toArray(children);
  // const items = ["Div #1", "Div #2", "Div #3"];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => {
        return prevIndex + 1;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getTranslateValue = () => {
    return `translateX(-${
      (activeIndex % items.length) * (100 / items.length)
    }%)`;
  };

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.container}
        style={{
          transform: getTranslateValue(),
          width: `calc(100% * ${items.length})`,
          transition: "transform 0.5s ease-in-out",
        }}
      >
        {items.map((item, index) => (
          <div className={styles.slide} key={index}>
            {item}
          </div>
        ))}
      </div>
      <div className={styles.options}>
        {items.map((item, index) => (
          <div
            className={clsx(
              styles.box,
              index === activeIndex % items.length && styles.selected
            )}
          ></div>
        ))}
      </div>
    </div>
  );
};
