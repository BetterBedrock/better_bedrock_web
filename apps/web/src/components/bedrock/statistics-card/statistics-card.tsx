import { Label } from "~/components/bedrock/label";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import { styles } from ".";
import { HTMLAttributes } from "react";
import { BarChart } from "~/components/statistics/bar-chart";

interface StatisticsCardProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  data: string;
}

export const StatisticsCard = ({ name, data, ...props }: StatisticsCardProps) => {
  return (
    <Label {...props}>
      <div className={styles.statistics}>
        <BedrockText type="p" text={name} textAlign="left" color="grey" />
        <BedrockText type="h2" text={data} textAlign="left" font="Minecraft" />
        <BarChart direction={"horizontal"} data={undefined} />
      </div>
    </Label>
  );
};
