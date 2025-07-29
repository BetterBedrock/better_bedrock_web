import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import { CircularProgressIndicator } from "~/components/bedrock/circular-progress-indicator";
import { Gallery } from "~/components/bedrock/gallery/gallery";
import { GridDownloadCard } from "~/components/bedrock/grid-download-card/grid-download-card";
import { Button } from "~/components/bedrock/button";
import { HeroPopup } from "~/pages/preview/components/hero/hero-popup";
import { useContent } from "~/providers/content";
import { Routes } from "~/utils/routes";
import { baseUrl } from "~/utils/url";

export const Hero = () => {
  const [showPopup, setShowPopup] = useState(false);
  const { downloads, fetched } = useContent();
  const params = useParams();
  const navigate = useNavigate();
  const downloadId = params.file;

  if (!fetched) {
    return <CircularProgressIndicator size="medium" />;
  }

  if (!downloads) {
    navigate(Routes.DOWNLOADS);
    return null;
  }

  const download = downloads.categories
    .flatMap((category) => category.lists)
    .flatMap((list) => list.items)
    .find((item) => item.downloadId === downloadId);

  if (!download) {
    navigate(Routes.DOWNLOADS);
    return null;
  }
  return (
    <div style={{ width: "100%" }}>
      {showPopup && <HeroPopup onClose={() => setShowPopup(false)} downloadItem={download} />}
      <GridDownloadCard 
        useTopDivider={true}
        title={download.title}
        downloadSize={`${download.itemWeight} MB`}
        thumbnail={
          <Gallery
            images={download.imageAssetUrl.map((image) => `${baseUrl}${image}`)}
            show={true}
            fullscreen={false}
          />
        }
        description={
          <>
            <BedrockText text={`@${download.creator}`} type={"p"} textAlign="left" color="white" />
            <br />
            <BedrockText text={download.description} type={"p"} textAlign="left" color="white" />
          </>
        }
        actions={
          <Button width="100%" type="green" onClick={() => setShowPopup((prev) => !prev)} center>
            <BedrockText text="Download" type="p" color="white" />
          </Button>
        }
      ></GridDownloadCard>
    </div>
  );
};
