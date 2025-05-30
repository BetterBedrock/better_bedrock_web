import { CircularProgressIndicator } from "~/components/bedrock/circular-progress-indicator";
import { CommunityActions, CommunityList } from "~/pages/downloads/components/community";
import { Heading } from "~/pages/downloads/components/heading";
import { useContent } from "~/providers/content";

export const Community = () => {
  const { downloads, fetched } = useContent();

  if (!fetched) {
    return <CircularProgressIndicator size="medium" />;
  }

  const communityDownloads = downloads!.community;

  return (
    <>
      <div>
        <BedrockText
          type="h1"
          text="Community Creations"
          color="white"
          font="MinecraftTen"
          textAlign="center"
        />
        <BedrockText
          type="p"
          textAlign="center"
          color="white"
          margin="0 0 1rem 0"
          text="Explore a variety of themes and configs made by the community of Better Bedrock users."
        />
        <CommunityActions />
        <CommunityList />
      </div>
    </>
  );
};
