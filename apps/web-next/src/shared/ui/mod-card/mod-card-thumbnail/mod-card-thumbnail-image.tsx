import Image from "next/image";
import styles from "./mod-card-thumbnail.module.scss";

interface ModCardThumbnailImageProps {
  src: string;
}

export const ModCardThumbnailImage = ({ src }: ModCardThumbnailImageProps) => (
  <Image
    width={128}
    height={128}
    src={src}
    alt="Mod Card Image"
    unoptimized
    className={styles.pixalated}
  />
);
