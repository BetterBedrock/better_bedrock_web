import { BedrockText } from "~/components/bedrock/bedrock-text";
import { CommunityActions, CommunityList } from "~/pages/downloads/components/community";

export const Community = () => {
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
