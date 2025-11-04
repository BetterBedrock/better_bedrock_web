"use client";

import { BedrockText } from "@/_components/bedrock-text";
import { Button } from "@/_components/button";
import { CardDivider } from "@/_components/card";
import { Popup } from "@/_components/popup";
import { BasePopupWrapperProps } from "@/_components/popup/popup-wrapper";
import { SimpleButton } from "@/_components/simple-button";
import { baseUrl } from "@/utils/url";
import { styles } from ".";
import { ChangeEvent, useRef } from "react";
import Exit from "@/public/images/exit.png";

interface GalleryPopupProps extends BasePopupWrapperProps {
  images: string[];
  onDeleteImage?: (index: number) => void;
  onAddImages?: (files: FileList) => void;
  maxImages?: number;
}

export const GalleryPopup = ({
  images,
  onAddImages,
  onDeleteImage,
  maxImages = 10,
}: GalleryPopupProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleAddClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };
  const handleFilesSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    onAddImages?.(e.target.files);
    e.target.value = "";
  };

  return (
    <Popup title="Edit Gallery" onClose={close}>
      <Popup.Wrapper>
        {images.length > 0 && (
          <>
            <Popup.Part>
              <div className={styles.list}>
                {images.map((src, idx) => (
                  <div key={src} className={styles.wrapper}>
                    <img
                      src={baseUrl + "/" + src}
                      alt={`Edit ${idx + 1}`}
                      className={styles.image}
                    />
                    <SimpleButton
                      onClick={() => onDeleteImage?.(idx)}
                      transparent
                      className={styles.delete}
                      width="100%"
                      height="100%"
                    >
                      <img alt="Close" src={Exit.src} className={styles.icon} />
                    </SimpleButton>
                  </div>
                ))}
              </div>
            </Popup.Part>
            <CardDivider />
          </>
        )}
        <Popup.Part>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            className={styles.input}
            onChange={handleFilesSelected}
          />
          <Button
            type={images.length >= maxImages ? "dark" : "green"}
            center
            onClick={handleAddClick}
          >
            <BedrockText
              text={`Add Images (${images.length} / ${maxImages})`}
              type="p"
              color="white"
            />
          </Button>
        </Popup.Part>
      </Popup.Wrapper>
    </Popup>
  );
};
