import { BedrockText } from "~/components/bedrock/bedrock-text";
import { HeroHeader, styles, useHero } from ".";
import { LoadingBar } from "~/components/bedrock/loading-bar/loading-bar";
import { CircularProgressIndicator } from "~/components/bedrock/circular-progress-indicator/circular-progress-indicator";

export const Hero = () => {
  const { downloadItem, cookie, download, downloadProgress } = useHero();

  if (!downloadItem) {
    return (
      <div className={styles.hero}>
        <CircularProgressIndicator size="medium" />
      </div>
    );
  }

  return (
    <div className={styles.hero}>
      <HeroHeader project={downloadItem} />
      <LoadingBar className={styles.bar} percentage={downloadProgress} />
      <BedrockText
        type="p"
        color="white"
        extraClassName={styles.label}
        text="Download did not start? Click here!"
        onClick={() => download(cookie.voucher)}
      />
    </div>
  );
};
