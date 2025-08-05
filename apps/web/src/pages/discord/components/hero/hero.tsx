import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Button } from "~/components/bedrock/button";

export const Hero = () => (
  <div>
    <BedrockText type="h1" text="Discord Redirect" color="white" font="MinecraftTen" />
    <BedrockText
      type="p"
      color="white"
      text={
        "If you were not automatically redirected, click button below to join our discord server."
      }
    />
    <Button
      width="100%"
      height="auto"
      type="green"
      center
      onClick={() => window.open("https://discord.gg/ZGK5WYXnEY", "_blank", "noopener,noreferrer")}
    >
      <BedrockText type="p" color="white" text="Join Discord" />
    </Button>
  </div>
);
