import { BedrockText } from "@/shared/ui/bedrock-text";
import { Card } from "@/shared/ui/card";

export const Header = () => (
  <Card fullWidth>
    <Card.Body>
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
    </Card.Body>
  </Card>
);
