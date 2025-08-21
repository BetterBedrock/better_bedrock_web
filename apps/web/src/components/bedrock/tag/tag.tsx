import { BedrockText } from "~/components/bedrock/bedrock-text";
import { styles } from ".";
import clsx from "clsx";

type Border = "left" | "right" | "bottom" | "top" | "all";

interface TagProps {
  name: string;
  border: Border | Border[];
  onDelete?: () => void;
  deletable?: boolean;
  // border:
}

export const Tag = ({ name, border, onDelete, deletable }: TagProps) => (
  <div
    className={clsx(
      styles.tag,
      Array.isArray(border) ? border.map((b) => styles[b]) : styles[border],
    )}
  >
    <BedrockText text={name} type="p" textAlign="center" color="black" />
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
