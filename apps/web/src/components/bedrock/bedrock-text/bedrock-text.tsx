import clsx from "clsx";
import { Link } from "react-router-dom";
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
  link?: string;
  isExternalLink?: boolean; // NEW: to differentiate link types
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
  link,
  isExternalLink = false,
}: BedrockTextProps) => {
  const Tag = type === "p2" ? "p" : type;
  const paragraphType = type === "p2" ? styles.p2 : "";

  const content = link ? (
    isExternalLink ? (
      <a href={link} className={styles.link} target="_blank" rel="noopener noreferrer">
        {text}
      </a>
    ) : (
      <Link to={link} className={styles.link}>
        {text}
      </Link>
    )
  ) : (
    text
  );

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
      {content}
    </Tag>
  );
};
