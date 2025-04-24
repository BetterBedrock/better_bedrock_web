import DownloadCard from "~/components/bedrock/download-card/download-card";
import { DownloadListProps } from "../";
import { styles } from ".";
import logo from "~/assets/images/favicon.png";

const calcItemWeight = (itemWeight: number) => {
  return itemWeight <= 0.1 ? "<0.0" : itemWeight.toFixed(1);
};

interface MainItemsList {
  category: DownloadListProps;
}

export const MainItemsList = ({ category }: MainItemsList) => (
  <div className={styles.items}>
    {category.items.map((downloadItem, _itemIndex) => (
      <DownloadCard
        key={downloadItem.title}
        title={downloadItem.title.toLowerCase()}
        description={downloadItem.description}
        downloadSize={`${calcItemWeight(downloadItem.itemWeight)}MB`}
        buttonType={downloadItem.buttonType}
        iconPath={downloadItem.imageAssetUrl ?? logo}
      />
    ))}
  </div>
);
