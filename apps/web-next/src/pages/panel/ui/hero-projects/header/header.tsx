import { BedrockText } from "@/shared/ui/bedrock-text";
import { Card, CardBody } from "@/shared/ui/card";

export const Header = () => (
  <Card fullWidth>
    <CardBody>
      <BedrockText
        text="Projects For Review"
        type="h1"
        color="white"
        font="Minecraft"
      />
      <BedrockText
        text="View all submitted projects awaiting for admin review."
        type="p"
        color="white"
      />
    </CardBody>
  </Card>
);
