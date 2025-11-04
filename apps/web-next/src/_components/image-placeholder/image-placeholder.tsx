"use client";

import { BedrockText } from "@/_components/bedrock-text";
import { Card } from "@/_components/card";
import { CircularProgressIndicator } from "@/_components/circular-progress-indicator";
import { ChangeEvent, useRef, useState } from "react";

import { styles } from ".";

interface ImagePlaceholderProps {
  onUpload?: (file: File) => Promise<void>;
  pass?: boolean;
  placeholder?: string;
  src?: string;
}

export const ImagePlaceholder = ({
  onUpload,
  src,
  pass,
  placeholder,
}: ImagePlaceholderProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);
  const handleCardClick = () => {
    if (pass) return;
    inputRef.current?.click();
  };

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (pass) return;
    const file = e.target.files?.item(0);

    if (!file) {
      return;
    }

    setLoading(true);
    await onUpload?.(file);
    setLoading(false);
  };

  return (
    <Card className={styles.placeholder} onClick={handleCardClick}>
      {src ? (
        <img src={src} className={styles.thumbnail} />
      ) : !loading ? (
        <BedrockText
          text={placeholder || "Click to upload image"}
          type="h3"
          font="Minecraft"
          color="white"
          extraClassName={styles.ignore}
        />
      ) : (
        <>
          <BedrockText
            text="Uploading..."
            type="h3"
            font="Minecraft"
            color="white"
            extraClassName={styles.ignore}
          />
          <CircularProgressIndicator size="small" />
        </>
      )}
      <input
        ref={inputRef}
        type="file"
        className={styles.hidden}
        onChange={handleInputChange}
      />
    </Card>
  );
};
