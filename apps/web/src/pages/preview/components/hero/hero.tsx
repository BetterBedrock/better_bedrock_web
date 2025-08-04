import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import { CircularProgressIndicator } from "~/components/bedrock/circular-progress-indicator";
import { Gallery } from "~/components/bedrock/gallery/gallery";
import { Button } from "~/components/bedrock/button";
import { HeroPopup } from "~/pages/preview/components/hero/hero-popup";
import { useContent } from "~/providers/content";
import { Routes } from "~/utils/routes";
import { baseUrl } from "~/utils/url";
import { styles } from ".";

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
    <div className={styles.preview}>
      {showPopup && <HeroPopup onClose={() => setShowPopup(false)} downloadItem={download} />}
      <div>
        <BedrockText
          text={download.title}
          type="h1"
          textAlign="center"
          color="white"
          font="MinecraftTen"
        />
        <BedrockText
          text={`${download.description ? download.description + " By " : ""}@${download.creator}`}
          extraClassName={styles.description}
          type="p"
          textAlign="center"
          color="white"
        />
        <Button
          className={styles.action}
          width="100%"
          type="green"
          onClick={() => setShowPopup((prev) => !prev)}
          center
        >
          <BedrockText text="Download" type="p" color="white" />
        </Button>
      </div>

      {download.richDescription?.length === undefined && (
        <Gallery
          images={download.imageAssetUrl.map((image) => `${baseUrl}${image}`)}
          show={true}
          fullscreen={false}
        />
      )}

      {download.richDescription?.map((description) => (
        <div>
          <BedrockText
            type="h1"
            text={description.name}
            color="white"
            font="MinecraftTen"
            extraClassName={styles.description}
          />
          <Gallery
            images={description.images.map((image) => `${baseUrl}${image}`)}
            show={true}
            fullscreen={false}
          />
        </div>
      ))}
    </div>
  );
};
