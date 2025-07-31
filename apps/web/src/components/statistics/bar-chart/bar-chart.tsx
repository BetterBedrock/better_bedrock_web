import { Label } from "~/components/bedrock/label";
import { styles } from ".";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Tooltip } from "~/components/bedrock/tooltip";
import { useState } from "react";
import { Collapsible } from "~/components/bedrock/collapsible";
import { Button } from "~/components/bedrock/button";

interface BarChartData {
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
  data?: BarChartData;
}

export const BarChart = ({ data }: BarChartProps) => {
  const fData = data
    ? data
    : ({
        categories: [
          {
            name: "2024",
            pieces: [
              {
                name: "Jan",
                value: 122,
              },
              {
                name: "Feb",
                value: 278,
              },
              {
                name: "March",
                value: 193,
              },
              {
                name: "April",
                value: 95,
              },
              {
                name: "May",
                value: 221,
              },
              {
                name: "June",
                value: 160,
              },
            ],
          },
          {
            name: "2025",
            pieces: [
              {
                name: "Jan",
                value: 186,
              },
              {
                name: "Feb",
                value: 305,
              },
              {
                name: "March",
                value: 237,
              },
              {
                name: "April",
                value: 73,
              },
              {
                name: "May",
                value: 209,
              },
              {
                name: "June",
                value: 214,
              },
            ],
          },
        ],
      } as BarChartData);

  const [category, setCategory] = useState(fData.categories[0].name);

  const selectedCategory = fData.categories.find((c) => category === c.name);

  if (fData.categories.length < 1 || !selectedCategory) {
    return <></>;
  }

  const values = fData.categories.flatMap((cat) => cat.pieces).map((p) => p.value);
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
      {fData.categories.length > 0 && (
        <Collapsible headerText={category} contentText={""}>
          {fData.categories.map((c) => (
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
              text={piece.value.toString()}
              className={styles.tooltip}
              style={{ height: `${piece.percentage}%` }}
            >
              <Label type="dark" height="100%" />
            </Tooltip>
          </div>
        ))}
      </div>
      <div className={styles.label}>
        {convertedData.map((piece) => (
          <div className={styles.piece}>
            <BedrockText text={piece.name} type="p" color="black" extraClassName={styles.text} />
          </div>
        ))}
      </div>
    </div>
  );
};
