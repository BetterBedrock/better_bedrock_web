import { BedrockText } from "~/components/bedrock/bedrock-text";
import { FData, StatisticsCardProps, styles, transformToFData } from ".";

import { BarChart } from "~/components/statistics/bar-chart";
import { Card } from "~/components/bedrock/card";
import { Button } from "../button";
import { useState } from "react";

export const StatisticsCard = ({
  name,
  data = [],
  range = "30d",
  showGraph = true,
  suffix = "",
  ...props
}: StatisticsCardProps) => {
  const [toggleGraph, setToggleGraph] = useState(true);

  let total = 0;
  let fdata: FData | null = null;

  if (typeof data === "number") {
    total = data;
  } else {
    fdata = transformToFData(data, range);
    total = fdata.categories[0].pieces.reduce((sum, p) => sum + p.value, 0);
  }

  return (
    <Card {...props}>
      <div className={styles.statistics}>
        <div className={styles.header}>
          <div className={styles.title}>
            <BedrockText
              extraClassName={styles.name}
              type="p"
              text={name}
              textAlign="left"
              color="grey"
            />
            <BedrockText
              key={total}
              type="h2"
              text={`${total.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 4 })}${suffix}`}
              textAlign="left"
              color="white"
              font="MinecraftTen"
              extraClassName={styles.highlight}
            />
          </div>
          {showGraph && fdata && (<Button
            width="auto"
            type="white"
            onClick={() =>
              setToggleGraph(!toggleGraph)
            }
            center>
            <BedrockText text={toggleGraph ? "Hide Chart" : "Show Chart"} type="p" color="black" />
          </Button>)}
        </div>
        {toggleGraph && showGraph && fdata && <BarChart direction="horizontal" data={fdata} />}
      </div>
    </Card>
  );
};
