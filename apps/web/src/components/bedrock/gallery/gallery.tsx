import { styles } from ".";
import ArrowUp from "~/assets/images/w_up_arrow.png";
import ArrowDown from "~/assets/images/w_down_arrow.png";
import { useState } from "react";

interface GalleryProps {
  images: string[];
}

export const Gallery = ({ images }: GalleryProps) => {
  if (images.length === 0) {
    return <></>;
  }

  const limit = 4;
  const [startingIndex, setStatingIndex] = useState<number>(0);

  const moveBack = () => {
    setStatingIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1));
  };

  const moveFoward = () => {
    setStatingIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
  };

  const displayedImages = images.slice(startingIndex, startingIndex + limit);
  const isOverflow = images.length > limit;

  return (
    <div className={styles.gallery}>
      <img className={styles.hero} src={images[0]} />
      <div className={styles.images}>
        {isOverflow && <img src={ArrowUp} onClick={moveBack} className={styles.arrow} />}
        {displayedImages.map((image, index) => (
          <img
            key={index}
            src={image}
            className={styles.preview}
            alt={`Gallery image ${index + 1}`}
          />
        ))}
        {isOverflow && <img src={ArrowDown} onClick={moveFoward} className={styles.arrow} />}
      </div>
    </div>
  );
};
