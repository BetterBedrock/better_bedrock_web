import { styles } from ".";
import ArrowLeft from "~/assets/images/w_left_arrow.png";
import ArrowRight from "~/assets/images/w_right_arrow.png";
import { useState, useEffect } from "react";
import clsx from "clsx";
import Exit from "~/assets/images/exit.png";
import { useMediaQuery } from "react-responsive"; // Add this import for media queries

interface GalleryProps {
  images: string[];
  onClose?: () => void;
  fullscreen?: boolean;
  show?: boolean;
}

export const Gallery = ({ images, fullscreen, show, onClose }: GalleryProps) => {
  const isLaptop = useMediaQuery({ query: "(max-width: 1440px)" }); // Add query for laptop screens
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isMobileSmall = useMediaQuery({ query: "(max-width: 480px)" }); // Adjust query for small mobile screens

  const limit = isMobileSmall ? 1 : isMobile ? 2 : isTablet ? 3 : isLaptop ? 4 : 5; // Adjust limit based on screen size
  const [startingIndex, setStartingIndex] = useState(0);
  const [selectedImage, setSelecteedImage] = useState(0);
  // Preload

  useEffect(() => {
    images.forEach((imageSrc) => {
      const img = new Image();
      img.src = imageSrc; // Preload
    });
  }, [images]);

  if (!show) {
    return null;
  }

  if (!images.length) return null;

  const moveBack = () => {
    setStartingIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const moveForward = () => {
    setStartingIndex((prev) => (prev + 1) % images.length);
  };

  const displayedImages =
    images.length <= limit
      ? images
      : Array.from({ length: limit }, (_, i) => images[(startingIndex + i) % images.length]);

  return (
    <div className={clsx(styles.gallery, fullscreen && styles.fullscreen)}>
      {fullscreen && (
        <button onClick={onClose}>
          <img alt="Close" src={Exit} className={styles.close} />
        </button>
      )}
      <div className={styles.hero}>
        <img
          key={`hero-${selectedImage}`}
          height="100%"
          width="100%"
          src={images[selectedImage]}
          alt="Main display"
        />
      </div>

      <div className={styles.images}>
        {images.length > limit && (
          <div className={styles.arrow}>
            <img
              key="arrow-left"
              height="100%"
              width="100%"
              src={ArrowLeft}
              onClick={moveBack}
              alt="Scroll left"
            />
          </div>
        )}

        {displayedImages.map((imageSrc, index) => {
          // Calculate the original index for more stable alt text if needed,
          // but imageSrc is best for the key.
          const originalImageGlobalIndex = (startingIndex + index) % images.length;
          return (
            <button
              className={clsx(
                styles.preview,
                originalImageGlobalIndex === selectedImage && styles.selected,
              )}
              onClick={() => {
                setSelecteedImage(originalImageGlobalIndex);
              }}
              key={imageSrc}
            >
              <img src={imageSrc} alt={`Gallery image ${originalImageGlobalIndex + 1}`} />
              <p className={clsx(styles.imageIndex)}>{' '}{originalImageGlobalIndex + 1}.</p> {/* Display index */}
            </button>
          );
        })}

        {images.length > limit && (
          <div className={styles.arrow}>
            <img
              key="arrow-right"
              height="100%"
              width="100%"
              src={ArrowRight}
              onClick={moveForward}
              alt="Scroll right" // Changed alt for clarity
            />
          </div>
        )}
      </div>
    </div>
  );
};
