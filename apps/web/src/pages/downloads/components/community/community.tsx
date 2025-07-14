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

  return communityDownloads.map((category, index) => (
    <div key={index}>
      <Heading title={category.title} description={category.description} />
      <CommunityActions buttons={category.buttons!} />
      <CommunityList items={category.items} />
    </div>
  ));
};
