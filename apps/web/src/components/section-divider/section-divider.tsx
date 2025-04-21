import React, { useState, useRef, useLayoutEffect } from "react";
import { styles } from ".";

interface SectionDividerProps {
  image: string;
  rows?: number;
  fullCenterRows?: number;
  blockSize?: number;
  edgeProbability?: number;
  overlap?: number;
}

interface Cell {
  x: number;
  render: boolean;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  image,
  rows = 3,
  fullCenterRows = 1,
  blockSize = 140,
  edgeProbability = 0.5,
  overlap,
}) => {
  const totalHeight = rows * blockSize;
  const overlapOffset = overlap ?? totalHeight / 3;
  const containerRef = useRef<HTMLDivElement>(null);
  const [grid, setGrid] = useState<Cell[][]>([]);

  const generateGrid = () => {
    const width = containerRef.current?.offsetWidth || 0;
    const cols = Math.ceil(width / blockSize);

    // calculate full center rows
    const startFull = Math.floor((rows - fullCenterRows!) / 2);
    const endFull = startFull + fullCenterRows! - 1;
    const maxDistAbove = startFull;
    const maxDistBelow = rows - 1 - endFull;

    // initialize grid
    const newGrid: Cell[][] = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, (_, c) => ({ x: c * blockSize, render: false })),
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
        if (newGrid[inner][c].render && Math.random() < prob) {
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
        if (newGrid[inner][c].render && Math.random() < prob) {
          cell.render = true;
        }
      });
    }

    // sanitize 2x2 blocks outside full rows to avoid solid squares
    for (let r = 0; r < rows - 1; r++) {
      for (let c = 0; c < cols - 1; c++) {
        // skip sanitize if any involved row is fully filled
        if ((r >= startFull && r <= endFull) || (r + 1 >= startFull && r + 1 <= endFull)) {
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
    generateGrid();
  }, [rows, fullCenterRows, blockSize, edgeProbability]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: totalHeight,
        overflow: "hidden",
        margin: `-${overlapOffset}px 0 -${overlapOffset}px`,
      }}
      className={styles.wrapper}
    >
      {grid.map((row, r) => (
        <div
          key={r}
          style={{
            top: r * blockSize,
            height: blockSize,
          }}
          className={styles.row}
        >
          {row.map((cell, c) =>
            cell.render ? (
              <img
                key={c}
                src={image}
                style={{
                  left: cell.x,
                  width: blockSize,
                  height: blockSize,
                }}
                className={styles.block}
              />
            ) : null,
          )}
        </div>
      ))}
    </div>
  );
};
