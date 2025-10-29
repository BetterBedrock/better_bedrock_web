import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Button } from "~/components/bedrock/button";

export const HeroAction = () => (
  <Button
    width="100%"
    height="auto"
    type="green"
    center
    onClick={() => window.open("https://discord.gg/ZGK5WYXnEY", "_blank", "noopener,noreferrer")}
  >
    <BedrockText type="p" color="white" text="Join Discord" />
  </Button>
);
