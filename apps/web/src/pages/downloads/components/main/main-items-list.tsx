import DownloadCard from "~/components/bedrock/download-card/download-card";
import { styles } from ".";
import logo from "~/assets/images/favicon.png";
import { useContent } from "~/providers/content";
import { DownloadListProps } from "~/pages/downloads";

const calcItemWeight = (itemWeight: number) => {
  return itemWeight <= 0.1 ? "<0.0" : itemWeight.toFixed(1);
};

interface MainItemsList {
  category: DownloadListProps;
}

export const openInNewTab = (url: string): void => {
  const newWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (newWindow) newWindow.opener = null;
};

export const MainItemsList = ({ category }: MainItemsList) => {
  const { generateDownload } = useContent();

  const openLinkvertise = () => {
    const currentUrl = new URL(window.location.origin);
    const segments = currentUrl.pathname.split("/").filter(Boolean);
    segments.push("fetch");
    currentUrl.pathname = "/" + segments.join("/");

    const linkvertiseId = import.meta.env.VITE_LINKVERTISE_ID;
    const baseUrl = `https://link-to.net/${linkvertiseId}/${Math.random() * 1000}/dynamic/`;

    const encodedUri = currentUrl.toString();
    const base64Encoded = btoa(encodedUri)

    const href = `${baseUrl}?r=${base64Encoded}`;
    const finalUri = new URL(href);

    window.open(finalUri.toString(), "_blank");
  };

  return (
    <div className={styles.items}>
      {category.items.map((downloadItem, _itemIndex) => (
        <DownloadCard
          key={downloadItem.title}
          title={downloadItem.title.toLowerCase()}
          description={downloadItem.description}
          downloadSize={`${calcItemWeight(downloadItem.itemWeight)}MB`}
          buttonType={downloadItem.buttonType}
          iconPath={
            downloadItem.imageAssetUrl ? `http://localhost:8084${downloadItem.imageAssetUrl}` : logo
          }
          onClick={async () => {
            await generateDownload(downloadItem.downloadId);
            openLinkvertise();
          }}
        />
      ))}
    </div>
  );
};
