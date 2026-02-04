import { calculateItemDisplayWeight } from "@/shared/lib/utils";
import { Routes } from "@/shared/lib/utils";
import { Link } from "@/shared/ui/link";
import DownloadCard from "@/pages/downloads/ui/download-card/download-card";
import { SimpleCategory } from "@/shared/lib/information";

import styles from "./better-bedrock.module.scss";

interface MainItemsList {
  categoryId: string;
  category: SimpleCategory;
}

export const BetterBedrockItemsList = ({ category }: MainItemsList) => (
  <div className={styles.list}>
    {category.items.map((project, _itemIndex) => {
      const item = category.categoryItems.find(
        (i) => i.projectId === project.id,
      );

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
            downloadSize={`${calculateItemDisplayWeight(project.itemWeight)}MB`}
            buttonType={item.buttonType}
            tags={project.tags.map((tag) => tag.name)}
            type={item.type}
          />
        </Link>
      );
    })}
  </div>
);
