import { BedrockText } from "~/components/bedrock/bedrock-text";
import { styles } from ".";
import clsx from "clsx";
import { ReactNode } from "react";

type Border = "left" | "right" | "bottom" | "top" | "all";

interface TagProps {
  name: string | ReactNode;
  border: Border | Border[];
  onDelete?: () => void;
  deletable?: boolean;
  className?: string;
}

export const Tag = ({ name, className, border, onDelete, deletable }: TagProps) => (
  <div
    className={clsx(
      styles.tag,
      Array.isArray(border) ? border.map((b) => styles[b]) : styles[border],
      className && className,
    )}
  >
    {typeof name === "string" ? (
      <BedrockText text={name} type="p" textAlign="center" color="black" />
    ) : (
      name
    )}
    {deletable && (
      <BedrockText
        text="x"
        type="p"
        textAlign="center"
        color="black"
        onClick={onDelete}
        extraClassName={styles.delete}
      />
    )}
  </div>
);
