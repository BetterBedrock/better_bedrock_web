import DownloadCard from "~/components/bedrock/download-card/download-card";
import { styles } from ".";
import logo from "~/assets/images/favicon.png";
import { Routes } from "~/utils/routes";
import { baseUrl } from "~/utils/url";
import { useState } from "react";
import { Link } from "~/components/link";
import { DownloadsItemDto } from "~/assets/content/dto/downloads-item.dto";
import { DownloadsListDto } from "~/assets/content/dto/downloads-list.dto";

// const calcItemWeight = (itemWeight: number) => {
//   return itemWeight <= 0.1 ? "<0.0" : itemWeight.toFixed(1);
// };

interface MainItemsList {
  categoryId: string;
  category: DownloadsListDto;
}

export const openInNewTab = (url: string): void => {
  const newWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (newWindow) newWindow.opener = null;
};

export const MainItemsList = ({ category }: MainItemsList) => {
  const [_, setDownloadItem] = useState<DownloadsItemDto | null>(null);

  const handleOpenLink = (): string | undefined => {
    if (category.title === "Featured") {
      return Routes.LATEST;
    }
  };

  return (
    <>
      {/* {item && <PreviewPopup onClose={() => setDownloadItem(null)} />} */}
      <div className={styles.list}>
        {/* styles.grid */}
        {category.items.map((item, _itemIndex) => (
          // downloads!.default === categoryId ? (
          <Link key={_itemIndex} link={handleOpenLink()} className={styles.hide}>
            <DownloadCard
              title={"Test"}
              description={"Description"}
              downloadSize={`0MB`}
              buttonType={item.buttonType}
              iconPath={item.imageAssetUrl ? `${baseUrl}${item.imageAssetUrl}` : logo}
              tags={["Test"]}
              tagBgColor={item.tagBgColor}
              titleColor={item.titleColor}
              onClick={async () => {
                if (category.title !== "Featured") {
                  setDownloadItem(item);
                }
              }}
            />
          </Link>
        ))}
      </div>
    </>
  );
};

// ) : (
//   <GridDownloadCard
//     key={item.downloadId}
//     title={item.title}
//     tags={item.tags}
//     description={
//       <BedrockText text={`@${item.creator}`} type={"p"} textAlign="left" color="white" />
//     }
//     thumbnail={`${baseUrl}${item.imageAssetUrl[0]}`}
//     actions={
//       <ButtonGroup>
//         <Button
//           onClick={() => setDownloadItem(item)}
//           width="100%"
//           height="auto"
//           type="green"
//           center
//         >
//           <BedrockText color="white" text="Download" type="p" />
//         </Button>
//         <Link link={handleOpenLink(item)} className={styles.hide}>
//           <Button
//             width="100%"
//             height="auto"
//             type="white"
//             center
//             onClick={() => navigate(`${Routes.PREVIEW}/${item.downloadId}`)}
//           >
//             <BedrockText color="black" text="Preview" type="p" />
//           </Button>
//         </Link>
//       </ButtonGroup>
//     }
//   />
