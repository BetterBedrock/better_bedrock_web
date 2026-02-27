"use client";

import { GalleryPopup, styles } from ".";
import ArrowLeft from "@/public/images/w_left_arrow.png";
import ArrowRight from "@/public/images/w_right_arrow.png";
import Exit from "@/public/images/exit.png";
import { useState, useEffect, useRef, useCallback } from "react";
import clsx from "clsx";
import { BedrockText } from "@/shared/ui/bedrock-text";
import { Button } from "@/shared/ui/button";
import { PopupWrapper } from "@/shared/ui/popup";
import { baseUrl } from "@/shared/lib/utils";
import { default as NextImage } from "next/image";

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
  const [selectedImage, setSelectedImage] = useState(0);
  const [offset, setOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRefs = useRef<Map<number, HTMLButtonElement>>(new Map());

  // Clamp selected index when images change
  useEffect(() => {
    if (images.length === 0) return;
    setSelectedImage((prev) => (prev >= images.length ? 0 : prev));
  }, [images.length]);

  // Preload all images
  useEffect(() => {
    images.forEach((src) => {
      const img = new window.Image();
      img.src = `${baseUrl}/${src}`;
    });
  }, [images]);

  // Center the selected thumbnail in the container
  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    const thumb = thumbRefs.current.get(selectedImage);
    if (!container || !track || !thumb) return;

    const containerWidth = container.offsetWidth;
    const trackWidth = track.scrollWidth;
    
    // If all thumbnails fit, don't scroll
    if (trackWidth <= containerWidth) {
      setOffset(0);
      return;
    }

    const thumbCenter = thumb.offsetLeft + thumb.offsetWidth / 2;
    const maxOffset = Math.max(0, trackWidth - containerWidth);

    const target = Math.max(
      0,
      Math.min(thumbCenter - containerWidth / 2, maxOffset),
    );

    setOffset(target);
  }, [selectedImage, images.length]);

  const setThumbRef = useCallback(
    (index: number) => (el: HTMLButtonElement | null) => {
      if (el) thumbRefs.current.set(index, el);
      else thumbRefs.current.delete(index);
    },
    [],
  );

  if (!show) return null;

  const navigate = (direction: -1 | 1) => {
    setSelectedImage(
      (prev) => (prev + direction + images.length) % images.length,
    );
  };

  const showArrows = images.length > 3;

  return (
    <div
      className={clsx(
        styles.gallery,
        fullscreen && styles.fullscreen,
        className,
      )}
    >
      {fullscreen && (
        <button onClick={onClose} className={styles.closeButton}>
          <NextImage
            width={25}
            height={25}
            unoptimized
            alt="Close"
            src={Exit.src}
            className={styles.close}
          />
        </button>
      )}

      <div className={styles.hero}>
        {images.length === 0 ? (
          <div className={styles.empty}>
            <BedrockText
              text="No images provided"
              type="h3"
              font="Minecraft"
              textAlign="center"
              color="white"
            />
          </div>
        ) : (
          <img
            key={`hero-${selectedImage}`}
            src={`${baseUrl}/${images[selectedImage]}`}
            alt="Main display"
            width="100%"
            height="100%"
          />
        )}
      </div>

      {images.length > 0 && (
        <div className={styles.thumbnailRow}>
          {showArrows && (
            <button className={styles.arrow} onClick={() => navigate(-1)}>
              <img src={ArrowLeft.src} alt="Previous" />
            </button>
          )}

          <div className={styles.images} ref={containerRef}>
            <div
              className={styles.track}
              ref={trackRef}
              style={{ transform: `translateX(-${offset}px)` }}
            >
              {images.map((src, index) => (
                <button
                  key={`thumb-${index}`}
                  ref={setThumbRef(index)}
                  className={clsx(
                    styles.preview,
                    index === selectedImage && styles.selected,
                  )}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={`${baseUrl}/${src}`}
                    alt={`Gallery ${index + 1}`}
                  />
                </button>
              ))}
            </div>
          </div>

          {showArrows && (
            <button className={styles.arrow} onClick={() => navigate(1)}>
              <img src={ArrowRight.src} alt="Next" />
            </button>
          )}
        </div>
      )}

      {edit && (
        <PopupWrapper
          className={styles.popupWrapper}
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
  );
};
