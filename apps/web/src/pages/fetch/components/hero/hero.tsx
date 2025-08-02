import { BedrockText } from "~/components/bedrock/bedrock-text";
import { styles } from ".";
import { LoadingBar } from "~/components/bedrock/loading-bar/loading-bar";
import { useLocation, useNavigate } from "react-router-dom";
import { useContent } from "~/providers/content";
import { useEffect, useState } from "react";
import { CircularProgressIndicator } from "~/components/bedrock/circular-progress-indicator/circular-progress-indicator";
import { useNotification } from "~/providers/notification";
import { useCookies } from "react-cookie";
import { VerificationException } from "~/exception/verification-exception";
import { Routes } from "~/utils/routes";
import { VoucherDto } from "~/lib/api";

export const Hero = () => {
  const [cookie, _, removeCookie] = useCookies(["voucher"]);
  const { verifyDownload, download, downloadProgress, downloadItem, downloading } = useContent();
  const { sendNotification } = useNotification();
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();

  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const hash = query.get("hash");

  useEffect(() => {
    //Timeout required because linkvertise servers are too slow /shrug
    const timer = setTimeout(async () => {
      if (hash || cookie.voucher) {
        try {
          await verifyDownload(hash ?? undefined, (cookie.voucher as VoucherDto)?.code);
          setVerified(true);
        } catch (err) {
          if (err instanceof VerificationException) {
            if (err.httpCode === 410 || err.httpCode === 401 || err.httpCode === 403) {
              removeCookie("voucher");
              navigate(Routes.HOME);
            }
          }

          console.log(err);
        }
      } else {
        sendNotification({
          title: "No Hash",
          label: "You are missing hash in your link",
          type: "error",
        });
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!verified) {
      return;
    }

    if (downloadItem && !downloading) {
      download(cookie.voucher);
    }
  }, [downloadItem, verified]);

  if (!downloadItem || (!hash && !cookie.voucher)) {
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
        onClick={() => {
          download(cookie.voucher);
        }}
      />
    </div>
  );
};
