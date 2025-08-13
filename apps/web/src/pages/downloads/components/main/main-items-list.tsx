import DownloadCard from "~/components/bedrock/download-card/download-card";
import { styles } from ".";
import logo from "~/assets/images/favicon.png";
import { useNavigate } from "react-router-dom";
import { Routes } from "~/utils/routes";
import { baseUrl } from "~/utils/url";
import { useState } from "react";
import { DownloadsItemDto, DownloadsListDto } from "~/lib/api";
import { useContent } from "~/providers/content";
import { GridDownloadCard } from "~/components/bedrock/grid-download-card/grid-download-card";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import { ButtonGroup } from "~/components/button-group/button-group";
import { Button } from "~/components/bedrock/button";
import { PreviewPopup } from "~/pages/preview/components/hero/preview-popup";
import { Link } from "~/components/link";

const calcItemWeight = (itemWeight: number) => {
  return itemWeight <= 0.1 ? "<0.0" : itemWeight.toFixed(1);
};

interface MainItemsList {
  categoryId: string;
  category: DownloadsListDto;
}

export const openInNewTab = (url: string): void => {
  const newWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (newWindow) newWindow.opener = null;
};

export const MainItemsList = ({ category, categoryId }: MainItemsList) => {
  const navigate = useNavigate();
  const { downloads } = useContent();
  const [item, setDownloadItem] = useState<DownloadsItemDto | null>(null);

  const handleOpenLink = (item: DownloadsItemDto): string | undefined => {
    if (item.richDescription || item.imageAssetUrl.length > 1) {
      return Routes.PREVIEW + "/" + item.downloadId;
    }

    if (category.title === "Featured") {
      return Routes.LATEST;
    }
  };

  return (
    <>
      {item && <PreviewPopup onClose={() => setDownloadItem(null)} downloadItem={item} />}
      <div className={downloads!.default === categoryId ? styles.list : styles.grid}>
        {category.items.map((item, _itemIndex) =>
          downloads!.default === categoryId ? (
            <Link key={item.title} link={handleOpenLink(item)} className={styles.hide}>
              <DownloadCard
                title={item.title.toLowerCase()}
                description={item.description}
                downloadSize={`${calcItemWeight(item.itemWeight)}MB`}
                buttonType={item.buttonType}
                iconPath={item.imageAssetUrl ? `${baseUrl}${item.imageAssetUrl}` : logo}
                tags={item.tags}
                tagBgColor={item.tagBgColor}
                titleColor={item.titleColor}
                onClick={async () => {
                  if (category.title !== "Featured") {
                    setDownloadItem(item);
                  }
                }}
              />
            </Link>
          ) : (
            <GridDownloadCard
              key={item.downloadId}
              title={item.title}
              tags={item.tags}
              description={
                <BedrockText text={`@${item.creator}`} type={"p"} textAlign="left" color="white" />
              }
              thumbnail={`${baseUrl}${item.imageAssetUrl[0]}`}
              actions={
                <ButtonGroup>
                  <Button
                    onClick={() => setDownloadItem(item)}
                    width="100%"
                    height="auto"
                    type="green"
                    center
                  >
                    <BedrockText color="white" text="Download" type="p" />
                  </Button>
                  <Link link={handleOpenLink(item)} className={styles.hide}>
                    <Button
                      width="100%"
                      height="auto"
                      type="white"
                      center
                      onClick={() => navigate(`${Routes.PREVIEW}/${item.downloadId}`)}
                    >
                      <BedrockText color="black" text="Preview" type="p" />
                    </Button>
                  </Link>
                </ButtonGroup>
              }
            />
          ),
        )}
      </div>
    </>
  );
};
