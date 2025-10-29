import { Banner } from "~/components/bedrock/banner";
import { LoadingBar } from "~/components/bedrock/loading-bar";
import { styles } from ".";

interface HeroDownloadProgressProps {
  progress: number;
}

export const HeroDownloadProgress = ({ progress }: HeroDownloadProgressProps) =>
  progress == 100 ? (
    <Banner message="File received successfully" type="important" />
  ) : (
    <LoadingBar className={styles.bar} percentage={progress} />
  );
