import {
  HeroDownloadProgress,
  HeroRedownloadMessage,
  HeroHeader,
  HeroLoading,
  styles,
  useStartDownload,
  useFetchHash,
} from ".";

export const Hero = () => {
  const hash = useFetchHash();
  const { downloadItem, downloadProgress } = useStartDownload({ hash });

  if (!downloadItem) {
    return <HeroLoading />;
  }

  return (
    <div className={styles.hero}>
      <HeroHeader project={downloadItem} />
      <HeroDownloadProgress progress={downloadProgress} />
      <HeroRedownloadMessage />
    </div>
  );
};
