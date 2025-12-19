import { Tooltip } from "@/components/tooltip";
import { Label } from "@/components/label";

import { styles } from ".";

export interface BarChartData {
  categories: BarChartCategory[];
}

interface BarChartCategory {
  name: string;
  pieces: BarChartPiece[];
}

interface BarChartPiece {
  name: string;
  value: number;
  percentage?: number;
}

interface BarChartProps {
  category: string;
  direction: "horizontal" | "vertical";
  data: BarChartData;
}

export const BarChart = ({ data, category }: BarChartProps) => {
  if (data.categories.length < 1) {
    return;
  }

  const selectedCategory = data.categories.find((c) => category === c.name);

  if (data.categories.length < 1 || !selectedCategory) {
    return <></>;
  }

  const values = data.categories
    .flatMap((cat) => cat.pieces)
    .map((p) => p.value);
  const min = 0;
  const max = Math.max(...values);
  const range = max - min || 1; // avoid divide-by-zero

  const convertedData = selectedCategory.pieces.map((piece) => ({
    name: piece.name,
    value: piece.value,
    percentage: ((piece.value - min) / range) * 100,
  }));

  return (
    <div className={styles.chart}>
      <div className={styles.data}>
        {convertedData.map((piece, index) => (
          <div key={piece.name + index} className={styles.piece}>
            <Tooltip
              text={`${piece.name}\n${piece.value.toString()}`}
              className={styles.tooltip}
            >
              <Label type="white" style={{ height: `${piece.percentage}%` }} />
            </Tooltip>
          </div>
        ))}
      </div>
    </div>
  );
};
