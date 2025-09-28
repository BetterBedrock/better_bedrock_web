import { BedrockText } from "~/components/bedrock/bedrock-text";

export const Header = () => (
  <div>
    <BedrockText text="Projects For Review" type="h1" color="white" font="Minecraft" />
    <BedrockText text="View all submitted projects awaiting for admin review" type="p" color="white"/>
  </div>
);
