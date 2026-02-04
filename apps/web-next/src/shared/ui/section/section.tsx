import { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

import styles from "./section.module.scss";
import { getImageProps } from "next/image";
import { getBackgroundImage } from "@/shared/lib/section";

interface SectionProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  fixed?: boolean;
  center?: boolean;
  className?: string;
  extraClassName?: string;
  src?: string;
  gradientBackground?: boolean;
  dark?: boolean;
}

export const Section = ({
  children,
  fixed,
  center,
  className,
  extraClassName,
  src,
  gradientBackground = true,
  dark = false,
  ...props
}: SectionProps) => {
  const {
    props: { srcSet },
  } = getImageProps({
    alt: "Background Image",
    width: 1920,
    height: 1080,
    src: src ?? "",
  });
  const backgroundImage = getBackgroundImage(srcSet);
  const gradient = `linear-gradient(rgba(0, 0, 0, ${dark ? "0.7" : "0.4"}), rgba(0, 0, 0, ${dark ? "0.7" : gradientBackground ? "0.7" : "0.4"}))`;
  const style = {
    background: `${gradient}, ${backgroundImage}`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div
      style={!fixed ? style : undefined}
      className={clsx(styles.wrapper, !fixed && className && className)}
      {...props}
    >
      {fixed && (
        <div
          style={style}
          className={clsx(fixed && styles.fixed, className && className)}
        />
      )}
      <section
        className={clsx(
          styles.section,
          center && styles.center,
          extraClassName && extraClassName,
        )}
      >
        {children}
      </section>
    </div>
  );
};
