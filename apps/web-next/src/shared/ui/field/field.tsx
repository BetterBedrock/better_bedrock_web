import { BedrockText } from "@/shared/ui/bedrock-text";
import { ReactNode } from "react";
import { FieldErrors } from "react-hook-form";

import styles from "./field.module.scss";

interface FieldProps {
  name: string;
  id: string;
  errors: FieldErrors;
  children: ReactNode;
}

export const Field = ({ name, id, errors, children }: FieldProps) => (
  <>
    <BedrockText textAlign="start" color="white">
      {name}
    </BedrockText>
    {children}
    {errors[id] && (
      <BedrockText
        type="p2"
        extraClassName={styles.error}
        text={errors[id].message as string}
        textAlign="start"
      />
    )}
  </>
);
