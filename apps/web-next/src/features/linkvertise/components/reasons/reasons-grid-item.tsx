import { BedrockText } from "@/components/bedrock-text";
import { Card, CardBody } from "@/components/card";

import styles from "./reasons.module.scss";

interface ReasonsGridItemProps {
  title: string;
  description: string;
}

export const ReasonsGridItem = ({
  title,
  description,
}: ReasonsGridItemProps) => (
  <Card sub>
    <CardBody>
      <BedrockText
        type="h3"
        text={title}
        textAlign="left"
        color="white"
        font="Minecraft"
      />
      <BedrockText type="p" text={description} textAlign="left" color="white" />
    </CardBody>
  </Card>
);
