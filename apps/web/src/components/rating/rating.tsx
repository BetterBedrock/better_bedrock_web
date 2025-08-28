import React, { useEffect, useState } from "react";
import FilledStar from "~/assets/ui/star/filledStar.png";
import EmptyStar from "~/assets/ui/star/emptyStar.png";
import HalfFilledStar from "~/assets/ui/star/halfFilledStar.png";
import { styles } from ".";
import { Tooltip } from "~/components/bedrock/tooltip";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import { BedrockComponentProps } from "~/types";
import clsx from "clsx";

interface RatingProps extends BedrockComponentProps {
  simple?: boolean;
  max?: number;
  rating?: number;
  suffix?: string;
  selectable?: boolean;
  onUpdate?: (rating: number) => void;
  onReset?: () => void;
  className?: string;
}

export const Rating: React.FC<RatingProps> = ({
  suffix,
  max = 5,
  rating = 1,
  simple,
  selectable = false,
  onUpdate,
  onReset,
  className = "",
  size = "small",
}) => {
  const [selected, setSelected] = useState<number>(rating ?? 1);
  const [preview, setPreview] = useState<number | null>(null);

  useEffect(() => setSelected(rating ?? 1), [rating]);

  const current = preview ?? selected;

  const getFill = (i: number, v: number) =>
    v >= i + 1 ? "full" : v > i && v < i + 1 ? "half" : "empty";

  // ⭐️ No half-selection — only integers
  const handleMouseMove = (e: React.MouseEvent, index: number) =>
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

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
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

  const text = `${selected}/${max}${suffix ? ` ${suffix}` : ""}`;
  const starStyles = clsx(styles.star, styles[size]);

  return (
    <Tooltip text={text}>
      <div className={clsx(styles.rating, className && className)}>
        {simple ? (
          <>
            <BedrockText extraClassName={styles.text} type="p" text={text} color="white" />
            {selectable ? (
              <button
                aria-label={`Set rating (current ${selected} of ${max})`}
                type="button"
                className={styles.starButton || ""}
                onClick={() => handleClick(selected >= max ? 1 : max)}
                onKeyDown={(e) =>
                  e.key === "Enter" || e.key === " "
                    ? (e.preventDefault(), handleClick(selected >= max ? 1 : max))
                    : null
                }
              >
                <img className={starStyles} src={FilledStar} alt="star" />
              </button>
            ) : (
              <img className={starStyles} src={FilledStar} alt="star" />
            )}
          </>
        ) : (
          <>
            {Array.from({ length: max }, (_, i) => {
              const fill = getFill(i, current);
              const src =
                fill === "full" ? FilledStar : fill === "half" ? HalfFilledStar : EmptyStar;
              return selectable ? (
                <button
                  key={i}
                  type="button"
                  className={styles.starButton || ""}
                  onMouseMove={(e) => handleMouseMove(e, i)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleClick(i + 1)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  aria-label={`Set rating to ${i + 1}`}
                  aria-pressed={selected >= i + 1}
                  style={{ padding: 0, border: "none", background: "transparent" }}
                >
                  <img className={starStyles} src={src} alt={`${i + 1} star`} />
                </button>
              ) : (
                <img key={i} className={starStyles} src={src} alt={`${i + 1} star`} />
              );
            })}
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
