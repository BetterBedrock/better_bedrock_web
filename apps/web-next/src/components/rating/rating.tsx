"use client";

import { KeyboardEvent, MouseEvent, useEffect, useState } from "react";
import FilledStar from "@/public/ui/star/filledStar.png";
import EmptyStar from "@/public/ui/star/emptyStar.png";
import HalfFilledStar from "@/public/ui/star/halfFilledStar.png";
import { styles } from ".";
import clsx from "clsx";
import { BedrockComponentProps } from "@/types/components";
import { BedrockText } from "@/components/bedrock-text";
import { Tooltip } from "@/components/tooltip";

const formatNumber = (num: number | undefined | null, decimals: number) => {
  return typeof num === "number" && !isNaN(num)
    ? Number(num.toFixed(decimals))
    : 0;
};

interface RatingProps extends BedrockComponentProps {
  simple?: boolean;
  max?: number;
  rating?: number;
  suffix?: string;
  selectable?: boolean;
  onUpdate?: (rating: number) => void;
  onReset?: () => void;
  className?: string;
  extraClassName?: string;
}

export const Rating = ({
  suffix,
  max = 5,
  rating = 1,
  simple,
  selectable = false,
  onUpdate,
  onReset,
  className = "",
  size = "small",
  extraClassName,
}: RatingProps) => {
  const [selected, setSelected] = useState<number>(rating ?? 0);
  const [preview, setPreview] = useState<number | null>(null);

  useEffect(() => setSelected(rating ?? 0), [rating]);

  const current = preview ?? selected;

  const getFill = (i: number, v: number) =>
    v >= i + 1 ? "full" : v > i && v < i + 1 ? "half" : "empty";

  const handleMouseMove = (e: MouseEvent, index: number) =>
    selectable && setPreview(index + 1);
  const handleMouseLeave = () => selectable && setPreview(null);

  const handleClick = (value: number) => {
    if (!selectable) return;
    const next = Math.max(0, value);
    setSelected(next);
    onUpdate?.(next);
  };

  const handleReset = () => {
    if (!selectable) return;
    setSelected(0);
    setPreview(null);
    onReset?.();
  };

  const handleKeyDown = (e: KeyboardEvent, index: number) => {
    if (!selectable) return;
    const key = e.key;
    if (key === "Enter" || key === " ") {
      e.preventDefault();
      handleClick(index + 1);
      return;
    }
    if (["ArrowLeft", "ArrowDown", "ArrowRight", "ArrowUp"].includes(key)) {
      e.preventDefault();
      const delta = key === "ArrowLeft" || key === "ArrowDown" ? -1 : 1;
      const next = Math.max(1, Math.min(max, (preview ?? selected) + delta));
      setPreview(next);
    }
  };

  const text = `${formatNumber(preview ?? selected, 2)}/${max}${suffix ? ` ${suffix}` : ""}`;
  const starStyles = clsx(styles.star, styles[size]);

  return (
    <Tooltip text={text} className={extraClassName}>
      <div
        className={clsx(
          styles.rating,
          selectable && styles.selectable,
          className && className
        )}
      >
        {simple ? (
          <>
            <BedrockText extraClassName={styles.text} type="p" text={text} />
            {selectable ? (
              <button
                aria-label={`Set rating (current ${selected} of ${max})`}
                type="button"
                className={styles.starButton || ""}
                onClick={() => handleClick(selected >= max ? 1 : max)}
                onKeyDown={(e) =>
                  e.key === "Enter" || e.key === " "
                    ? (e.preventDefault(),
                      handleClick(selected >= max ? 1 : max))
                    : null
                }
              >
                <img className={starStyles} src={FilledStar.src} alt="star" />
              </button>
            ) : (
              <img className={starStyles} src={FilledStar.src} alt="star" />
            )}
          </>
        ) : (
          <>
            <div>
              {Array.from({ length: max }, (_, i) => {
                const fill = getFill(i, current);
                const src =
                  fill === "full"
                    ? FilledStar
                    : fill === "half"
                      ? HalfFilledStar
                      : EmptyStar;
                return selectable ? (
                  <button
                    key={i}
                    type="button"
                    className={styles.button}
                    onMouseMove={(e) => handleMouseMove(e, i)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick(i + 1)}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                    aria-label={`Set rating to ${i + 1}`}
                    aria-pressed={selected >= i + 1}
                  >
                    <img
                      className={starStyles}
                      src={src.src}
                      alt={`${i + 1} star`}
                    />
                  </button>
                ) : (
                  <img
                    key={i}
                    className={starStyles}
                    src={src.src}
                    alt={`${i + 1} star`}
                  />
                );
              })}
            </div>
            {selectable && (
              <BedrockText
                text="Reset Rating"
                onClick={handleReset}
                type="p"
                color="white"
              />
            )}
          </>
        )}
      </div>
    </Tooltip>
  );
};
