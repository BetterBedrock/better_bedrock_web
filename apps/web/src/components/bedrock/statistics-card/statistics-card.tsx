import { BedrockText } from "~/components/bedrock/bedrock-text";
import { FData, StatisticsCardProps, styles, transformToFData } from ".";

import { BarChart } from "~/components/statistics/bar-chart";
import { Card } from "~/components/bedrock/card";

export const StatisticsCard = ({
  name,
  data = [],
  range = "7d",
  showGraph = true,
  suffix = "",
  ...props
}: StatisticsCardProps) => {
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
        <BedrockText
          extraClassName={styles.name}
          type="h3"
          text={name}
          textAlign="left"
          color="grey"
        />
        <BedrockText
          key={total}
          type="h2"
          text={`Total ${total.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 4 })}${suffix}`}
          textAlign="left"
          color="white"
          font="Minecraft"
          extraClassName={styles.highlight}
        />
        {showGraph && fdata && <BarChart direction="horizontal" data={fdata} />}
      </div>
    </Card>
  );
};
