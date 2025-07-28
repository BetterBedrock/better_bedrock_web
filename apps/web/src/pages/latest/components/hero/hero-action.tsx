import { useState } from "react";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Button } from "~/components/bedrock/button";
import { DownloadsItemDto } from "~/lib/api";
import { HeroPopup } from "~/pages/preview/components/hero/hero-popup";
import { useContent } from "~/providers/content";

export const HeroAction = () => {
  const { downloads } = useContent();
  const [downloadItem, setDownloadItem] = useState<DownloadsItemDto | null>(null);

  const featuredCategory = downloads?.main.find((category) => category.title === "Featured");

  if (!downloads || !featuredCategory || featuredCategory.items.length <= 0) {
    return <></>;
  }

  const featuredItem = featuredCategory.items[0];

  return (
    <>
      {downloadItem && (
        <HeroPopup onClose={() => setDownloadItem(null)} downloadItem={downloadItem} />
      )}
      <Button
        width="100%"
        height="auto"
        type="green"
        onTap={() => setDownloadItem(featuredItem)}
        center
      >
        <BedrockText text="Download Latest Better Bedrock Texture Pack" type="p" color="white" />
      </Button>
    </>
  );
};
