import { BedrockText } from "@/components/bedrock-text";
import { Card, CardBody } from "@/components/card/card";

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
        text="View all submitted projects awaiting for admin review"
        type="p"
        color="white"
      />
    </CardBody>
  </Card>
);
