import {
  HeroDownloadProgress,
  HeroRedownloadMessage,
  HeroHeader,
  HeroLoading,
  styles,
  useHero,
} from ".";

export const Hero = () => {
  const { downloadItem, downloadProgress } = useHero();

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
