import { BedrockText } from "~/components/bedrock/text";
import { Section } from "~/components/section";
import { styles } from ".";
import LoadingBar from "~/components/bedrock/LoadingBar";
import { useLocation } from "react-router-dom";
import { useContent } from "~/providers/content";
import { useEffect } from "react";
import CircularProgressIndicator from "~/components/bedrock/CircularProgressIndicator";

export const Hero = () => {
  const { verifyDownload, download, downloadProgress, downloadItem, downloading } = useContent();

  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const hash = query.get("hash");

  useEffect(() => {
    if (hash) {
      verifyDownload(hash);
    }
  }, []);

  useEffect(() => {
    if (downloadItem && !downloading && downloadProgress === 0) {
      download();
    }
  }, [downloadItem]);

  if (!hash) {
    return (
      <Section className={styles.background}>
        <div style={{ width: "100%" }}>
          <BedrockText type="h1" text="ERROR" color="white" font="MinecraftTen" />
          <BedrockText type="p" color="white" text="No file to download" />
        </div>
      </Section>
    );
  }

  if (!downloadItem) {
    return (
      <Section className={styles.background}>
        <div className={styles.hero}>
          <CircularProgressIndicator width="50px" height="50px" />
        </div>
      </Section>
    );
  }

  return (
    <Section className={styles.background}>
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
        {/* <Button
          width="100%"
          height="50px"
          type="alwaysWhite"
          text="Download"
          onClick={() => {
            download();
          }} */}
        {/* /> */}
      </div>
    </Section>
  );
};
