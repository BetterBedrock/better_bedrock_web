import { HTMLAttributes } from "react";
import clsx from "clsx";
import { BedrockComponentProps } from "@/shared/lib/utils";

import styles from "./circular-progress-indicator.module.scss";

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
    <img src="/svgs/circularProgressIndicator.svg" className={styles.svg} />
  </div>
);