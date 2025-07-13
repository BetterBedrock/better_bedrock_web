import clsx from "clsx";
import { styles } from ".";

export interface BedrockTextProps {
  text: string;
  font?: string;
  color?: string;
  textAlign?: "left" | "right" | "center" | "justify" | "start" | "end" | undefined;
  margin?: string;
  selectable?: boolean;
  strong?: boolean;
  type: "h1" | "h2" | "h3" | "p" | "p2";
  style?: React.CSSProperties;
  extraClassName?: string | string[];
  onClick?: () => void;
}

export const BedrockText = ({
  text,
  color = "unset",
  font = "Mojangles",
  type,
  textAlign = "center",
  selectable = true,
  strong = false,
  margin,
  style,
  onClick,
  extraClassName = [],
}: BedrockTextProps) => {
  const Tag = type === "p2" ? "p" : type;
  const paragraphType = type === "p2" ? styles.p2 : "";

  return (
    <Tag
      className={clsx(
        paragraphType,
        styles.text,
        selectable === false ? styles.non_selectable : "",
        onClick && styles.underline,
        strong && styles.strong,
        ...(Array.isArray(extraClassName) ? extraClassName : [extraClassName]),
      )}
      style={{
        fontFamily: font,
        color: color,
        textAlign: textAlign,
        margin: margin,
        ...style,
      }}
      onClick={onClick}
    >
      {text}
    </Tag>
  );
};
