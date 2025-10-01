import DownloadCard from "~/components/bedrock/download-card/download-card";
import { SimpleCategory, styles } from ".";
import logo from "~/assets/images/favicon.png";
import { Routes } from "~/utils/routes";
import { baseUrl } from "~/utils/url";
import { Link } from "~/components/link";
import { useNavigate } from "react-router-dom";

export const calcItemWeight = (itemWeight: number) => {
  return itemWeight <= 0.1 ? "<0.0" : itemWeight.toFixed(1);
};

interface MainItemsList {
  categoryId: string;
  category: SimpleCategory;
}

export const openInNewTab = (url: string): void => {
  const newWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (newWindow) newWindow.opener = null;
};

export const MainItemsList = ({ category }: MainItemsList) => {
  const navigate = useNavigate();

  const handleOpenLink = (): string | undefined => {
    if (category.title === "Featured") {
      return Routes.LATEST;
    }
  };

  return (
    <>
      <div className={styles.list}>
        {/* styles.grid */}
        {category.items.map((project, _itemIndex) => {
          const item = category.categoryItems.find((i) => i.projectId === project.id);

          if(!item) return;
          return (
            // downloads!.default === categoryId ? (
            <Link key={_itemIndex} link={handleOpenLink()} className={styles.hide}>
              <DownloadCard
                title={project.title}
                description={item.description}
                downloadSize={`${calcItemWeight(project.itemWeight)}MB`}
                buttonType={item.buttonType}
                iconPath={item.imageAssetUrl ? `${baseUrl}${item.imageAssetUrl}` : logo}
                tags={project.tags.map((tag) => tag.name)}
                tagBgColor={item.tagBgColor}
                titleColor={item.titleColor}
                onClick={async () => {
                  if (category.title !== "Featured") {
                    navigate(Routes.PROJECT_PREVIEW + "/" + project.id)
                  }
                }}
              />
            </Link>
          );
        })}
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
