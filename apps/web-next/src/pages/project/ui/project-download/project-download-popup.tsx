"use client";

import { BedrockText } from "@/shared/ui/bedrock-text";
import { Button } from "@/shared/ui/button";
import { DetailedProjectDto, UserDto, VoucherDto } from "@/shared/lib/openapi";

import { useDownloadButton } from "@/pages/project/model/use-download-button";
import { PreviewPopup } from "@/pages/project/ui/project-download/preview-popup/preview-popup";
import Image from "next/image";
import { useNotification } from "@/app/providers/notification";

import styles from "./project-download.module.scss";
import { Card } from "@/shared/ui/card";
import { useDisappearDownloadButton } from "@/pages/project/model/use-disappear-download-button";

interface ProjectDownloadPopupProps {
  voucher?: VoucherDto;
  user?: UserDto;
  detailedProject: DetailedProjectDto;
}

const scrollToElement = (id: string, offset: number = 80) => {
  const element = document.getElementById(id);
  if (element) {
    const y = element.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
};

export const ProjectDownloadPopup = ({
  detailedProject,
  user,
  voucher,
}: ProjectDownloadPopupProps) => {
  const { handleClick, openPopup, handleClosePopup } = useDownloadButton(
    user!,
    detailedProject,
    voucher,
  );

  const ref = useDisappearDownloadButton();
  const { sendNotification } = useNotification();

  const handleScrollToRate = () => {
    if (!user) {
      sendNotification({
        title: "Login required",
        label: "You need to be logged in to rate this project.",
        type: "warning",
      });
      return;
    }
    scrollToElement("project-rate-section");
  };

  const handleScrollToComment = () => {
    scrollToElement("project-comments-section");
  };

  if (!detailedProject?.downloadFile) return null;

  //instantDownload
  return (
    <>
      {openPopup && (
        <PreviewPopup onClose={handleClosePopup} project={detailedProject} />
      )}
      <Card className={styles.card} sub ref={ref}>
        <Card.Body className={styles.cardBody}>
          <Button
            id="download"
            width="100%"
            type="green"
            onClick={handleClick}
            center
            className={styles.anchor}
          >
            <BedrockText text="Download" type="p" color="white" />
          </Button>
          <Button
            id="rate"
            width="auto"
            type="dark"
            onClick={handleScrollToRate}
            center
            className={`${styles.anchor} ${styles.mobileExtraButton}`}
          >
            <Image
              src="/icons/rate2.png"
              alt="Rate"
              width={24}
              height={24}
              className={styles.iconImage}
            />
          </Button>
          <Button
            id="comment"
            width="auto"
            type="dark"
            onClick={handleScrollToComment}
            center
            className={`${styles.anchor} ${styles.mobileExtraButton}`}
          >
            <Image
              src="/icons/comment2.png"
              alt="Comment"
              width={24}
              height={24}
              className={styles.iconImage}
            />
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};
