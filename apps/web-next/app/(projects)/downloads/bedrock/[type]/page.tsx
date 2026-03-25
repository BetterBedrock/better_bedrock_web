import { bedrockDownloadPages } from "@/shared/config";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ type: string }>;
}) => {
  const loadedParams = await params;
  const urlType = loadedParams?.type;

  const downloadPage = bedrockDownloadPages.find(
    (page) => page.details.url === urlType,
  );

  return {
    title: downloadPage ? downloadPage.title : "Downloads - Better Bedrock",
    description: downloadPage
      ? downloadPage.description
      : "Explore and download the best Minecraft Bedrock Edition mods, texture packs, addons, maps, and more. Enhance your gaming experience with high-quality content created by the community.",
  };
};

export { BedrockPage as default } from "@/pages/downloads";
