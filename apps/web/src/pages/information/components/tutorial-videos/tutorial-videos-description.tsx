import { BedrockText } from "~/components/bedrock/bedrock-text";

interface TutorialVideosDescriptionProps {
  description: string;
}

export const TutorialVideosDescription = ({ description }: TutorialVideosDescriptionProps) => (
  <BedrockText type="p" color="white" text={description} />
);
