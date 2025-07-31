import { useState } from "react";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Button } from "~/components/bedrock/button";
import { ButtonGroup } from "~/components/button-group/button-group";
import { DownloadsItemDto } from "~/lib/api";
import { HeroPopup } from "~/pages/preview/components/hero/hero-popup";
import { useContent } from "~/providers/content";
import { styles } from ".";
import { useNavigate } from "react-router-dom";
import { Routes } from "~/utils/routes";

export const HeroAction = () => {
  const navigate = useNavigate();
  const { downloads } = useContent();
  const [downloadItem, setDownloadItem] = useState<DownloadsItemDto | null>(null);

  const featuredCategory = downloads?.categories.flatMap((category) => category.lists).flatMap((list) => list.items);
  const featuredItem = featuredCategory?.find((item) => item.downloadId === downloads?.featured);

  if (!downloads || !featuredItem) {
    return <></>;
  }

  return (
    <>
      {downloadItem && (
        <HeroPopup onClose={() => setDownloadItem(null)} downloadItem={downloadItem} />
      )}
      <div className={styles.actions}>

        <ButtonGroup direction="responsive">
          <Button width="100%" type="green" onClick={() => setDownloadItem(featuredItem)} center>
            <BedrockText text="Download Now" type="p" color="white" />
          </Button>
          <Button width="100%" type="white" onClick={() => navigate(Routes.DOWNLOADS)} center>
            <BedrockText text="Join Discord" type="p" color="black" />
          </Button>
        </ButtonGroup>
      </div>
    </>
  );
};
