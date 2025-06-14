import DownloadCard from "~/components/bedrock/download-card/download-card";
import { styles } from ".";
import logo from "~/assets/images/favicon.png";
import { useNavigate } from "react-router-dom";
import { Routes } from "~/utils/routes";
import { baseUrl } from "~/utils/url";
import { HeroPopup } from "~/pages/preview/components/hero/hero-popup";
import { DownloadsItemDto, DownloadsListDto } from "@better-bedrock/constants/downloads.dto";
import { useState } from "react";

const calcItemWeight = (itemWeight: number) => {
  return itemWeight <= 0.1 ? "<0.0" : itemWeight.toFixed(1);
};

interface MainItemsList {
  category: DownloadsListDto;
}

export const openInNewTab = (url: string): void => {
  const newWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (newWindow) newWindow.opener = null;
};

export const MainItemsList = ({ category }: MainItemsList) => {
  const navigate = useNavigate();
  const [downloadItem, setDownloadItem] = useState<DownloadsItemDto | null>(null);

  return (
    <>
      {downloadItem && (
        <HeroPopup onClose={() => setDownloadItem(null)} downloadItem={downloadItem} />
      )}
      <div className={styles.items}>
        {category.items.map((downloadItem, _itemIndex) => (
          <DownloadCard
            key={downloadItem.title}
            title={downloadItem.title.toLowerCase()}
            description={downloadItem.description}
            downloadSize={`${calcItemWeight(downloadItem.itemWeight)}MB`}
            buttonType={downloadItem.buttonType}
            iconPath={downloadItem.imageAssetUrl ? `${baseUrl}${downloadItem.imageAssetUrl}` : logo}
            onClick={async () => {
              if (category.title === "Featured") {
                navigate(Routes.LATEST);
                return;
              } else {
                setDownloadItem(downloadItem);
              }
            }}
          />
        ))}
      </div>
    </>
  );
};
