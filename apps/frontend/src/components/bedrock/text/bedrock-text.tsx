import clsx from "clsx";
import styles from "./bedrock-text.module.css";

export interface BedrockTextProps {
  text: string;
  font?: string;
  color?: string;
  textAlign?:
  | "left"
  | "right"
  | "center"
  | "justify"
  | "start"
  | "end"
  | undefined;
  margin?: string;
  selectable?: boolean;
  strong?: boolean;
  type: "h1" | "h2" | "h3" | "p" | "p2";
}

export const BedrockText = ({
  text,
  color,
  font = "Mojangles",
  type,
  textAlign,
  selectable = true,
  strong = false,
  margin,
}: BedrockTextProps) => {
  const Tag = type === "p2" ? "p" : type;
  const paragraphType = type === "p2" ? styles.p2 : "";
  return (
    <Tag
      className={clsx(
        paragraphType,
        styles.text,
        selectable === false ? styles.non_selectable : "",
        //to jakies rozjebane jest bo nie dziala XD
        // strong && styles.strong
      )}
      style={{
        fontFamily: font,
        color: color,
        textAlign: textAlign,
        margin: margin,
      }}
    >
      {text}
    </Tag>
  );
};
