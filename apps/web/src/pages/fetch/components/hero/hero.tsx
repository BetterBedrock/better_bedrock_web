import { BedrockText } from "~/components/bedrock/bedrock-text";
import { styles } from ".";
import { LoadingBar } from "~/components/bedrock/loading-bar/loading-bar";
import { useLocation } from "react-router-dom";
import { useContent } from "~/providers/content";
import { useEffect } from "react";
import { CircularProgressIndicator } from "~/components/bedrock/circular-progress-indicator/circular-progress-indicator";
import { useNotification } from "~/providers/notification";

export const Hero = () => {
  const { verifyDownload, download, downloadProgress, downloadItem, downloading } = useContent();
  const { sendNotification } = useNotification();

  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const hash = query.get("hash");

  useEffect(() => {
    const handleLoad = () => {
      if (hash) {
        verifyDownload(hash);
      } else {
        sendNotification({
          title: "No Hash",
          label: "You are missing hash in your link",
          type: "error",
        });
      }
    };

    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  useEffect(() => {
    if (downloadItem && !downloading && downloadProgress === 0) {
      download();
    }
  }, [downloadItem]);

  if (!downloadItem || !hash) {
    return (
      <div className={styles.hero}>
        <CircularProgressIndicator size="medium" />
      </div>
    );
  }

  return (
    <div className={styles.hero}>
      <div>
        <div className={styles.header}>
          <BedrockText type="h1" text="DOWNLOADING" color="white" font="MinecraftTen" />
        </div>
        <BedrockText type="p" color="white" text={downloadItem.title} />
      </div>
      <LoadingBar className={styles.loadingBar} percentage={downloadProgress} />
      <BedrockText
        type="p"
        color="white"
        extraClassName={styles.label}
        text="Download did not start? Click here!"
        onClick={download}
      />
    </div>
  );
};
