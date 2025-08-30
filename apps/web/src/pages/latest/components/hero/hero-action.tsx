import { useState } from "react";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Button } from "~/components/bedrock/button";
import { styles } from ".";
// import { useNavigate } from "react-router-dom";
// import { Routes } from "~/utils/routes";
import { MAIN_LIST } from "~/assets/content/better-bedrock";
import { DownloadsItemDto } from "~/assets/content/dto/downloads-item.dto";

export const HeroAction = () => {
  // const navigate = useNavigate();
  const [_, setDownloadItem] = useState<DownloadsItemDto | null>(null);

  const featuredCategory = MAIN_LIST;
  const featuredItem = featuredCategory.lists[0];

  if (!featuredItem) {
    return <></>;
  }

  return (
    <>
      {/* {downloadItem && (
        <PreviewPopup onClose={() => setDownloadItem(null)} downloadItem={downloadItem} />
      )} */}
      <div className={styles.actions}>
        <Button width="100%" type="green" onClick={() => setDownloadItem(featuredItem)} center>
          <BedrockText text="Download Now!" type="p" color="white" />
        </Button>
        {/* <ButtonGroup direction="responsive">
          <Button width="100%" type="green" onClick={() => setDownloadItem(featuredItem)} center>
            <BedrockText text="Download Now" type="p" color="white" />
          </Button>
          <Button width="100%" type="white" onClick={() => navigate(Routes.DOWNLOADS)} center>
            <BedrockText text="Join Discord" type="p" color="black" />
          </Button>
        </ButtonGroup> */}
      </div>
    </>
  );
};
