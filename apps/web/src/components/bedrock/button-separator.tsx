import React, { ReactNode, Fragment, cloneElement, HTMLAttributes } from "react";
import { useMediaQuery } from "react-responsive";
import styles from "./button-separator.module.css";

interface ButtonSeparatorProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode[];
  applyButtonOutlinePadding?: boolean;
  style?: React.CSSProperties;
}

export const ButtonSeparator: React.FC<ButtonSeparatorProps> = ({
  children,
  applyButtonOutlinePadding = true,
  style,
  ...props
}) => {
  const isPair = children.length === 2;

  const mediaMaxWidth = useMediaQuery({ query: "(max-width: 400px)" });

  const directionStyles: React.CSSProperties = !mediaMaxWidth
    ? {}
    : {
        flexDirection: "column",
        gap: "0.5rem",
      };

  return (
    <div style={{ display: "flex", width: "100%", ...directionStyles, ...style }} {...props}>
      {React.Children.map(children, (child, index) => (
        <Fragment key={index}>
          {cloneElement(
            child as React.ReactElement,
            applyButtonOutlinePadding
              ? {
                  outlinePaddingLeft: mediaMaxWidth
                    ? ""
                    : isPair
                      ? index === 1
                        ? "0px"
                        : ""
                      : index > 0 && index < children.length
                        ? "0px"
                        : "",
                  outlinePaddingRight: mediaMaxWidth
                    ? ""
                    : isPair
                      ? index === 0
                        ? "0px"
                        : ""
                      : index >= 0 && index < children.length - 1
                        ? "0px"
                        : "",
                }
              : {},
          )}
          {!mediaMaxWidth && index < children.length - 1 && <div className={styles.divider}></div>}
        </Fragment>
      ))}
    </div>
  );
};
