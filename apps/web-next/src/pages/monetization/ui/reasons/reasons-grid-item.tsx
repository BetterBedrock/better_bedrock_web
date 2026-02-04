import { BedrockText } from "@/shared/ui/bedrock-text";
import { Card } from "@/shared/ui/card";

interface ReasonsGridItemProps {
  title: string;
  description: string;
}

export const ReasonsGridItem = ({
  title,
  description,
}: ReasonsGridItemProps) => (
  <Card sub>
    <Card.Body>
      <BedrockText
        type="h3"
        text={title}
        textAlign="left"
        color="white"
        font="Minecraft"
      />
      <BedrockText type="p" text={description} textAlign="left" color="white" />
    </Card.Body>
  </Card>
);
