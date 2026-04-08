import { Tag } from "@/shared/ui/tag";
import styles from "./mod-card-details.module.scss";

interface ModCardDetailsTagsProps {
  tags: string[];
}

export const ModCardDetailsTags = ({ tags }: ModCardDetailsTagsProps) => (
  <div className={styles.tags}>
    {tags.map((tag, index) => (
      <Tag key={index} name={tag} border="all" />
    ))}
  </div>
);
