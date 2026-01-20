"use client";

import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { styles } from ".";
import clsx from "clsx";
import { useMediaQuery } from "react-responsive";
import Image, { StaticImageData } from "next/image";

interface SectionDividerProps {
  image: StaticImageData;
  rows?: number;
  fullCenterRows?: number;
  blockSize?: number;
  edgeProbability?: number;
  overlap?: number;
  seed?: string;
}

interface Cell {
  x: number;
  render: boolean;
}

const hashString = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
};

class SeededRandom {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed % 2147483647;
    if (this.seed <= 0) this.seed += 2147483646;
  }

  next(): number {
    this.seed = (this.seed * 16807) % 2147483647;
    return (this.seed - 1) / 2147483646;
  }
}

export const SectionDivider = ({
  image,
  rows = 3,
  fullCenterRows = 1,
  blockSize = 140,
  edgeProbability = 0.5,
  overlap,
  seed,
}: SectionDividerProps) => {
  const useSafeMediaQuery = (query: string) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
      const media = window.matchMedia(query);
      setMatches(media.matches);
      const listener = () => setMatches(media.matches);
      media.addEventListener("change", listener);
      return () => media.removeEventListener("change", listener);
    }, [query]);

    return matches;
  };

  const isLaptop = useSafeMediaQuery("(max-width: 1440px)");
  const isTablet = useSafeMediaQuery("(max-width: 1024px)");
  const isMobile = useSafeMediaQuery("(max-width: 768px)");
  const isMobileSmall = useSafeMediaQuery("(max-width: 480px)");

  const finalBlockSize = Math.round(
    isMobileSmall
      ? blockSize / 1.8
      : isMobile
        ? blockSize / 1.6
        : isTablet
          ? blockSize / 1.4
          : isLaptop
            ? blockSize / 1.2
            : blockSize,
  );

  const totalHeight = rows * finalBlockSize;

  const overlapOffset = overlap ?? totalHeight / 3;
  const containerRef = useRef<HTMLDivElement>(null);
  const [grid, setGrid] = useState<Cell[][]>([]);

  const generateGrid = () => {
    const width = containerRef.current?.offsetWidth || 0;
    const cols = Math.ceil(width / finalBlockSize);

    const seedValue = `${seed}-${image}-${rows}-${fullCenterRows}-${finalBlockSize}-${edgeProbability}-${cols}`;
    const hashedSeed = hashString(seedValue);
    const rng = new SeededRandom(hashedSeed);

    // calculate full center rows
    const startFull = Math.floor((rows - fullCenterRows!) / 2);
    const endFull = startFull + fullCenterRows! - 1;
    const maxDistAbove = startFull;
    const maxDistBelow = rows - 1 - endFull;

    // initialize grid
    const newGrid: Cell[][] = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, (_, c) => ({
        x: c * finalBlockSize,
        render: false,
      })),
    );

    // fill full center rows
    for (let r = startFull; r <= endFull; r++) {
      newGrid[r].forEach((cell) => (cell.render = true));
    }

    // propagate upward
    for (let d = 1; d <= maxDistAbove; d++) {
      const r = startFull - d;
      const inner = r + 1;
      const prob = 1 - (d / maxDistAbove) * (1 - edgeProbability!);
      newGrid[r].forEach((cell, c) => {
        if (newGrid[inner][c].render && rng.next() < prob) {
          cell.render = true;
        }
      });
    }

    // propagate downward
    for (let d = 1; d <= maxDistBelow; d++) {
      const r = endFull + d;
      const inner = r - 1;
      const prob = 1 - (d / maxDistBelow) * (1 - edgeProbability!);
      newGrid[r].forEach((cell, c) => {
        if (newGrid[inner][c].render && rng.next() < prob) {
          cell.render = true;
        }
      });
    }

    // sanitize 2x2 blocks outside full rows to avoid solid squares
    for (let r = 0; r < rows - 1; r++) {
      for (let c = 0; c < cols - 1; c++) {
        // skip sanitize if any involved row is fully filled
        if (
          (r >= startFull && r <= endFull) ||
          (r + 1 >= startFull && r + 1 <= endFull)
        ) {
          continue;
        }
        if (
          newGrid[r][c].render &&
          newGrid[r][c + 1].render &&
          newGrid[r + 1][c].render &&
          newGrid[r + 1][c + 1].render
        ) {
          // remove bottom-right to break the square
          newGrid[r + 1][c + 1].render = false;
        }
      }
    }

    setGrid(newGrid);
  };

  useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    generateGrid();

    const handleResize = () => {
      generateGrid();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [rows, fullCenterRows, finalBlockSize, edgeProbability]);

  return (
    <div
      ref={containerRef}
      style={{
        height: totalHeight,
        margin: `${-overlapOffset}px 0 ${-overlapOffset}px`,
      }}
      className={styles.wrapper}
    >
      {grid.map((row, r) => (
        <div
          key={r}
          style={{
            top: r * finalBlockSize,
            height: finalBlockSize,
          }}
          className={styles.row}
        >
          {row.map((cell, c) =>
            cell.render ? (
              <Image
                key={c}
                src={image.src}
                alt="Section Divider Block"
                width={finalBlockSize}
                height={finalBlockSize}
                unoptimized
                style={{
                  left: cell.x,
                }}
                className={clsx(styles.block)}
              />
            ) : null,
          )}
        </div>
      ))}
    </div>
  );
};
