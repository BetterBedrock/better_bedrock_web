import { Label } from "~/components/bedrock/label";
import { styles } from ".";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Tooltip } from "~/components/bedrock/tooltip";
import { useState } from "react";
import { Collapsible } from "~/components/bedrock/collapsible";
import { Button } from "~/components/bedrock/button";

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
  direction: "horizontal" | "vertical";
  data: BarChartData;
}

export const BarChart = ({ data }: BarChartProps) => {
  if (data.categories.length < 1) {
    return;
  }
  const [category, setCategory] = useState(data.categories[0].name);

  const selectedCategory = data.categories.find((c) => category === c.name);

  if (data.categories.length < 1 || !selectedCategory) {
    return <></>;
  }

  const values = data.categories.flatMap((cat) => cat.pieces).map((p) => p.value);
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
      {data.categories.length > 0 && (
        <Collapsible floating headerText={category} contentText={""}>
          {data.categories.map((c) => (
            <Button
              type="dark"
              width="100%"
              isClicked={c.name === category}
              onClick={() => setCategory(c.name)}
              center
            >
              <BedrockText type="p" color="white" text={c.name} />
            </Button>
          ))}
        </Collapsible>
      )}
      <div className={styles.data}>
        {convertedData.map((piece) => (
          <div className={styles.piece}>
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
