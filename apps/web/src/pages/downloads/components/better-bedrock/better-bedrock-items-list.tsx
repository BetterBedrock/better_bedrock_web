import DownloadCard from "~/components/bedrock/download-card/download-card";
import { SimpleCategory, styles } from ".";
import { Routes } from "~/utils/routes";
import { Link } from "~/components/link";

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
  return (
    <div className={styles.list}>
      {/* styles.grid */}
      {category.items.map((project, _itemIndex) => {
        const item = category.categoryItems.find((i) => i.projectId === project.id);

        if (!item) return;

        return (
          <Link
            key={_itemIndex}
            link={Routes.PROJECT_PREVIEW + "/" + project.id}
            className={styles.hide}
          >
            <DownloadCard
              title={project.title}
              description={item.description}
              downloadSize={`${calcItemWeight(project.itemWeight)}MB`}
              buttonType={item.buttonType}
              tags={project.tags.map((tag) => tag.name)}
              type={item.type}
            />
          </Link>
        );
      })}
    </div>
  );
};