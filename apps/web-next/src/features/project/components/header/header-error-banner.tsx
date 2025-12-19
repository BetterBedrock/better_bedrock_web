import { Banner } from "@/components/banner";
import { BedrockText } from "@/components/bedrock-text";

interface HeaderErrorBannerProps {
  message: string;
}

export const HeaderErrorBanner = ({ message }: HeaderErrorBannerProps) => (
  <Banner
    type="error"
    message={
      <>
        <BedrockText
          textAlign="start"
          type="p"
          color="white"
          font="Minecraft"
          text="Your project has been decline for the following reason:"
        />
        <BedrockText textAlign="start" type="p" color="white" text={message} />
      </>
    }
  />
);
