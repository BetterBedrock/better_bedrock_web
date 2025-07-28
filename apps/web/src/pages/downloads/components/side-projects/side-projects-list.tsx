import { styles } from ".";
import { GridDownloadCard } from "~/components/bedrock/grid-download-card/grid-download-card";
import { useState } from "react";
import { ButtonGroup } from "~/components/button-group/button-group";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import { baseUrl } from "~/utils/url";
import { DownloadsItemDto } from "~/lib/api";
import { Button } from "~/components/bedrock/button";
import { Routes } from "~/utils/routes";
import { HeroPopup } from "~/pages/preview/components/hero/hero-popup";
import { useNavigate } from "react-router-dom";

interface SideProjectsListProps {
  items: DownloadsItemDto[];
}

export const SideProjectsList = ({ items }: SideProjectsListProps) => {
  const navigate = useNavigate();
  const [download, setDownload] = useState<DownloadsItemDto | null>(null);

  return (
    <div className={styles.list}>
      {download && <HeroPopup onClose={() => setDownload(null)} downloadItem={download} />}
      {items.map((item) => (
        <GridDownloadCard
          key={item.downloadId}
          title={item.title}
          downloadSize={`${item.itemWeight} MB`}
          description={
            <BedrockText text={`@${item.creator}`} type={"p"} textAlign="left" color="white" />
          }
          thumbnail={<img src={`${baseUrl}${item.imageAssetUrl[0]}`} alt={""} />}
          actions={
            <ButtonGroup>
              <Button
                onClick={() => setDownload(item)}
                width="100%"
                height="auto"
                type="green"
                center
              >
                <BedrockText color="white" text="Download" type="p" />
              </Button>
              <Button
                width="100%"
                height="auto"
                type="white"
                center
                onClick={() => navigate(`${Routes.PREVIEW}/${item.downloadId}`)}
              >
                <BedrockText color="black" text="Preview" type="p" />
              </Button>
            </ButtonGroup>
          }
        />
      ))}
    </div>
  );
};
