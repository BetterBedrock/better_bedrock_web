import { BedrockText } from "@/shared/ui/bedrock-text";
import { ReactNode } from "react";
import { FieldError } from "react-hook-form";

import styles from "./field.module.scss";

interface FieldProps {
  name: string;
  error: FieldError | undefined;
  children: ReactNode;
}

export const Field = ({ name, error, children }: FieldProps) => (
  <>
    <BedrockText textAlign="start" color="white">
      {name}
    </BedrockText>
    {children}
    {error?.message && (
      <BedrockText
        type="p2"
        extraClassName={styles.error}
        text={error.message}
        textAlign="start"
      />
    )}
  </>
);
