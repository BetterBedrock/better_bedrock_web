import { Label } from "~/components/bedrock/label";
import { BedrockText } from "~/components/bedrock/text";
import { styles } from ".";
import { HTMLAttributes } from "react";

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
      </div>
    </Label>
  );
};
