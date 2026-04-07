"use client";

import { BedrockText } from "@/shared/ui/bedrock-text";
import clsx from "clsx";

import styles from "./collapsible-text.module.scss";
import { ReactNode, useState } from "react";

interface CollapsibleTextProps {
  children?: ReactNode;
  className?: string;
}

export const CollapsibleText = ({
  children,
  className,
}: CollapsibleTextProps) => {
  const [showMore, setShowMore] = useState(true);

  const handleClickLink = () => {
    setShowMore((prev) => !prev);
  };

  return (
    <div className={clsx(styles.description, className)}>
      <BedrockText
        type="p"
        color="white"
        textAlign="start"
        extraClassName={clsx(styles.less, showMore && styles.singleLine)}
      >
        {children}
      </BedrockText>
      <BedrockText
        text={showMore ? "Read more" : "Read less"}
        extraClassName={styles.expand}
        onClick={handleClickLink}
      />
    </div>
  );
};
