import { BedrockText } from "@/_components/bedrock-text";
import { Card } from "@/_components/card";

import { styles } from ".";

interface ReasonsGridItemProps {
  title: string;
  description: string;
}

export const ReasonsGridItem = ({ title, description }: ReasonsGridItemProps) => (
  <Card sub className={styles.sub}>
    <div>
      <BedrockText type="h3" text={title} textAlign="left" color="white" font="Minecraft" />
      <BedrockText type="p" text={description} textAlign="left" color="white" />
    </div>
  </Card>
);
