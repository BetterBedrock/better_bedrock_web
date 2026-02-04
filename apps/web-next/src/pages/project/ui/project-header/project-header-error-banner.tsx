import { Banner } from "@/shared/ui/banner";
import { BedrockText } from "@/shared/ui/bedrock-text";

interface ProjectHeaderErrorBannerProps {
  message: string;
}

export const ProjectHeaderErrorBanner = ({
  message,
}: ProjectHeaderErrorBannerProps) => (
  <Banner
    type="error"
    message={
      <>
        <BedrockText
          textAlign="start"
          type="p"
          color="white"
          font="Minecraft"
          text="Your project has been declined for the following reason: "
        />
        <BedrockText textAlign="start" type="p" color="white" text={message} />
      </>
    }
  />
);
