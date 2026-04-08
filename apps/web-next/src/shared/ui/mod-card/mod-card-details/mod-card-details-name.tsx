import { BedrockText } from "@/shared/ui/bedrock-text";

interface ModCardDetailsNameProps {
  name: string;
}

export const ModCardDetailsName = ({ name }: ModCardDetailsNameProps) => (
  <BedrockText font="Minecraft" color="white" textAlign="start" type="h3">
    {name}
  </BedrockText>
);
