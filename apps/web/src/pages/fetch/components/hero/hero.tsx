import { BedrockText } from "~/components/bedrock/bedrock-text";
import { styles } from ".";
import LoadingBar from "~/components/bedrock/LoadingBar";
import { useLocation } from "react-router-dom";
import { useContent } from "~/providers/content";
import { useEffect } from "react";
import CircularProgressIndicator from "~/components/bedrock/CircularProgressIndicator";
import { useNotification } from "~/providers/notification";

export const Hero = () => {
  const { verifyDownload, download, downloadProgress, downloadItem, downloading } = useContent();
  const { sendNotification } = useNotification();

  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const hash = query.get("hash");

  useEffect(() => {
    if (hash) {
      verifyDownload(hash);
    }

    if (!hash) {
      sendNotification({
        title: "No Hash",
        label: "You are missing hash in your link",
        type: "error",
      });
    }
  }, []);

  useEffect(() => {
    if (downloadItem && !downloading && downloadProgress === 0) {
      download();
    }
  }, [downloadItem]);

  if (!downloadItem || !hash) {
    return (
      <div className={styles.hero}>
        <CircularProgressIndicator width="50px" height="50px" />
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
      <LoadingBar maxWidth="100%" height="20px" percentage={downloadProgress} />
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
