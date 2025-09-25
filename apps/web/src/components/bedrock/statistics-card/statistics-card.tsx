import { BedrockText } from "~/components/bedrock/bedrock-text";
import { FData, StatisticsCardProps, styles, transformToFData } from ".";

import { BarChart } from "~/components/statistics/bar-chart";
import { Card } from "~/components/bedrock/card";
import { Button } from "../button";
import { useState } from "react";
import { Collapsible } from "~/components/bedrock/collapsible";
import { ButtonGroup } from "~/components/button-group/button-group";

export const DATA_RANGE_OPTIONS = [
  { label: "7d", text: "Last 7 Days" },
  { label: "14d", text: "Last 14 Days" },
  { label: "30d", text: "Last 30 Days" },
  { label: "6m", text: "Last 6 Months" },
  { label: "ytd", text: "This Year" },
  { label: "all", text: "All Time" },
];

export const StatisticsCard = ({
  name,
  data = [],
  showGraph = true,
  suffix = "",
  ...props
}: StatisticsCardProps) => {
  const [toggleGraph, setToggleGraph] = useState(true);
  const [category, setCategory] = useState(DATA_RANGE_OPTIONS[0].label);

  let total = 0;
  let fdata: FData | null = null;

  if (typeof data === "number") {
    total = data;
  } else {
    fdata = transformToFData(data, category);
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
              font="Minecraft"
              extraClassName={styles.highlight}
            />
          </div>
          {showGraph && fdata && (
            <Button width="auto" type="white" onClick={() => setToggleGraph(!toggleGraph)} center>
              <BedrockText
                text={toggleGraph ? "Hide Chart" : "Show Chart"}
                type="p"
                color="black"
              />
            </Button>
          )}
        </div>
        <Collapsible
          floating
          headerText={DATA_RANGE_OPTIONS.find((d) => d.label === category)?.text ?? "No Data Range"}
          contentText={""}
          width="100%"
          limit
        >
          <ButtonGroup direction="vertical">
            {DATA_RANGE_OPTIONS.map((c) => (
              <Button
                type="dark"
                width="100%"
                isClicked={c.label === category}
                onClick={() => setCategory(c.label)}
                center
              >
                <BedrockText type="p" color="white" text={c.text} />
              </Button>
            ))}
          </ButtonGroup>
        </Collapsible>
        {toggleGraph && showGraph && fdata && (
          <BarChart direction="horizontal" data={fdata} category={category} />
        )}
      </div>
    </Card>
  );
};
