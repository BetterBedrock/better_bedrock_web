import clsx from "clsx";
import { ReasonsGridItem } from "./reasons-grid-item";
import styles from "./reasons.module.scss";
import { reasonsData } from "../../model/reasons-data";

export const ReasonsGridList = () => (
  <div className={styles.grid}>
    {reasonsData.map((reason, idx) => (
      <ReasonsGridItem
        key={idx}
        title={reason.title}
        description={reason.description}
      />
    ))}
  </div>
);
