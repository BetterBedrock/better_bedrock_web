import { BedrockText } from "@/shared/ui/bedrock-text";
import styles from "./tag.module.scss";
import clsx from "clsx";
import { ReactNode } from "react";

export const tagVariants = ["neutral", "blue", "special"] as const;
export type TagVariant = (typeof tagVariants)[number];

export const borders = ["left", "right", "bottom", "top", "all"];
export type Border = (typeof borders)[number];

interface TagProps {
  name: string | ReactNode;
  border: Border | Border[];
  onDelete?: () => void;
  deletable?: boolean;
  className?: string;
  variant?: TagVariant;
}

export const Tag = ({
  name,
  className,
  border,
  onDelete,
  deletable,
  variant = "neutral",
}: TagProps) => (
  <div
    className={clsx(
      styles.tag,
      Array.isArray(border) ? border.map((b) => styles[b]) : styles[border],
      styles["variant-" + variant],
      className && className,
    )}
  >
    {typeof name === "string" ? (
      <BedrockText text={name} type="p" textAlign="center" />
    ) : (
      name
    )}
    {deletable && (
      <BedrockText
        text="x"
        type="p"
        textAlign="center"
        onClick={onDelete}
        extraClassName={styles.delete}
      />
    )}
  </div>
);
