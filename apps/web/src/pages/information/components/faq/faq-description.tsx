import { BedrockText } from "~/components/bedrock/bedrock-text";

interface FAQDescriptionProps {
  description: string;
}

export const FAQDescription = ({ description }: FAQDescriptionProps) => (
  <BedrockText type="p" color="white" text={description} />
);
