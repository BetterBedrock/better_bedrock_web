import { BedrockText } from "@/components/bedrock-text";

interface CardDescriptionProps {
  description: string;
}

export const CardDescription = ({ description }: CardDescriptionProps) => (
  <BedrockText
    text={description}
    type="p"
    font="Mojangles"
    color="white"
    textAlign="center"
  />
);
