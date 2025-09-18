import { styles } from ".";
import ArrowLeft from "~/assets/images/w_left_arrow.png";
import ArrowRight from "~/assets/images/w_right_arrow.png";
import Exit from "~/assets/images/exit.png";
import { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { useMediaQuery } from "react-responsive";
import { SimpleButton } from "~/components/bedrock/simple-button";
import { Popup } from "~/components/bedrock/popup";
import { Button } from "~/components/bedrock/button";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import { CardDivider } from "~/components/bedrock/card";
import { baseUrl } from "~/utils/url";

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
  const [isEditOpen, setIsEditOpen] = useState(false);

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

  // File input for adding new images
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleAddClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };
  const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    onAddImages?.(e.target.files);
    // reset input so same files can be chosen again
    e.target.value = "";
  };

  return (
    <>
      <div className={clsx(styles.gallery, fullscreen && styles.fullscreen, className && className)}>
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
          <Button className={styles.editButton} onClick={() => setIsEditOpen(true)} center>
            <BedrockText type="p" text="Edit Images" color="white" />
          </Button>
        )}
      </div>

      {isEditOpen && (
        <Popup title="Edit Gallery" onClose={() => setIsEditOpen(false)}>
          <div className={styles.container}>
            {images.length > 0 && (
              <>
                <div className={styles.part}>
                  <div className={styles.list}>
                    {images.map((src, idx) => (
                      <div key={src} className={styles.wrapper}>
                        <img src={baseUrl + "/" + src} alt={`Edit ${idx + 1}`} className={styles.image} />
                        <SimpleButton
                          onClick={() => onDeleteImage?.(idx)}
                          transparent
                          className={styles.delete}
                          width="100%"
                          height="100%"
                        >
                          <img alt="Close" src={Exit} className={styles.icon} />
                        </SimpleButton>
                      </div>
                    ))}
                  </div>
                </div>
                <CardDivider />
              </>
            )}
            <div className={styles.part}>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                style={{ display: "none" }}
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
            </div>
          </div>
        </Popup>
      )}
    </>
  );
};
