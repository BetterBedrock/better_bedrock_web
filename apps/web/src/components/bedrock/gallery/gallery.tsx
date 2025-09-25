import { GalleryPopup, styles } from ".";
import ArrowLeft from "~/assets/images/w_left_arrow.png";
import ArrowRight from "~/assets/images/w_right_arrow.png";
import Exit from "~/assets/images/exit.png";
import { useState, useEffect } from "react";
import clsx from "clsx";
import { useMediaQuery } from "react-responsive";
import { Button } from "~/components/bedrock/button";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import { baseUrl } from "~/utils/url";
import { PopupWrapper } from "~/components/bedrock/popup/popup-wrapper";

interface GalleryProps {
  images: string[];
  onClose?: () => void;
  fullscreen?: boolean;
  show?: boolean;
  edit?: boolean;
  onDeleteImage?: (index: number) => void;
  onAddImages?: (files: FileList) => void;
  maxImages?: number;
  className?: string;
}

export const Gallery = ({
  images,
  fullscreen,
  show,
  onClose,
  edit = false,
  onDeleteImage,
  onAddImages,
  maxImages = 10,
  className,
}: GalleryProps) => {
  // Responsive limit for thumbnail scroller
  const isLaptop = useMediaQuery({ query: "(max-width: 1440px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isMobileSmall = useMediaQuery({ query: "(max-width: 480px)" });

  const limit = isMobileSmall ? 1 : isMobile ? 2 : isTablet ? 3 : isLaptop ? 4 : 5;

  const [startingIndex, setStartingIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);

  // Preload all images
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);

  if (!show) return;

  const moveBack = () => setStartingIndex((prev) => (prev - 1 + images.length) % images.length);

  const moveForward = () => setStartingIndex((prev) => (prev + 1) % images.length);

  const displayedImages =
    images.length <= limit
      ? images
      : Array.from({ length: limit }, (_, i) => images[(startingIndex + i) % images.length]);

  return (
    <>
      <div
        className={clsx(styles.gallery, fullscreen && styles.fullscreen, className && className)}
      >
        {fullscreen && (
          <button onClick={onClose} className={styles.closeButton}>
            <img alt="Close" src={Exit} className={styles.close} />
          </button>
        )}

        <div className={styles.hero}>
          {images.length < 1 ? (
            <div className={styles.empty}>
              <BedrockText
                text={"No images provided"}
                type="h2"
                font="Minecraft"
                textAlign="center"
                color="white"
              />
            </div>
          ) : (
            <img
              key={`hero-${selectedImage}`}
              src={baseUrl + "/" + images[selectedImage]}
              alt="Main display"
              width="100%"
              height="100%"
            />
          )}
        </div>

        {images.length > 0 && (
          <div className={styles.images}>
            {images.length > limit && (
              <div className={styles.arrow}>
                <img
                  src={ArrowLeft}
                  onClick={moveBack}
                  alt="Scroll left"
                  width="100%"
                  height="100%"
                />
              </div>
            )}

            {displayedImages.map((src, idx) => {
              const globalIndex = (startingIndex + idx) % images.length;
              return (
                <button
                  key={src}
                  className={clsx(styles.preview, globalIndex === selectedImage && styles.selected)}
                  onClick={() => setSelectedImage(globalIndex)}
                >
                  <img src={baseUrl + "/" + src} alt={`Gallery ${globalIndex + 1}`} />
                  <p className={styles.imageIndex}>{globalIndex + 1}.</p>
                </button>
              );
            })}

            {images.length > limit && (
              <div className={styles.arrow}>
                <img
                  src={ArrowRight}
                  onClick={moveForward}
                  alt="Scroll right"
                  width="100%"
                  height="100%"
                />
              </div>
            )}
          </div>
        )}

        {edit && (
          <PopupWrapper
            popup={(close) => (
              <GalleryPopup
                close={close}
                maxImages={maxImages}
                onDeleteImage={onDeleteImage}
                onAddImages={onAddImages}
                images={images}
              />
            )}
          >
            <Button className={styles.editButton} center>
              <BedrockText type="p" text="Edit Images" color="white" />
            </Button>
          </PopupWrapper>
        )}
      </div>
    </>
  );
};
