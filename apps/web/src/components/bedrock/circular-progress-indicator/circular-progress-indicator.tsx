import CircularProgressIndicatorSVG from "~/assets/svgs/circularProgressIndicator.svg";
import { styles } from ".";
import { HTMLAttributes } from "react";
import clsx from "clsx";
import { BedrockComponentProps } from "~/types";

interface CircularProgressIndicatorProp
  extends HTMLAttributes<HTMLDivElement>,
    BedrockComponentProps {
  className?: string;
}

export const CircularProgressIndicator = ({
  className,
  size = "medium",
  ...props
}: CircularProgressIndicatorProp) => (
  <div className={clsx(styles.indicator, className && className, styles[size])} {...props}>
    <img src={CircularProgressIndicatorSVG} className={styles.svg} />
  </div>
);
