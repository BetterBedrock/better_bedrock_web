import { Banner } from "@/_components/banner";
import { BedrockText } from "@/_components/bedrock-text";

interface HeaderErrorBannerProps {
    message: string;
}

export const HeaderErrorBanner = ({message}: HeaderErrorBannerProps) => (
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
