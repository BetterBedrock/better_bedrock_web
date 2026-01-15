import CircularProgressIndicatorSVG from "@/public/svgs/circularProgressIndicator.svg";
import { HTMLAttributes } from "react";
import clsx from "clsx";

import { styles } from ".";
import { BedrockComponentProps } from "@/shared/model/components";

interface CircularProgressIndicatorProp
  extends HTMLAttributes<HTMLDivElement>, BedrockComponentProps {
  className?: string;
  center?: boolean;
}

export const CircularProgressIndicator = ({
  className,
  size = "medium",
  center = false,
  ...props
}: CircularProgressIndicatorProp) => (
  <div
    className={clsx(
      styles.indicator,
      center && styles.center,
      className && className,
      styles[size],
    )}
    {...props}
  >
    <img src={CircularProgressIndicatorSVG.src} className={styles.svg} />
  </div>
);
