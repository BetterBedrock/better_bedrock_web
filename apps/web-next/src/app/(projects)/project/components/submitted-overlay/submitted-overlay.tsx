import { SubmittedOverlayDescription } from "@/app/(projects)/project/components/submitted-overlay/submitted-overlay-description";
import { SubmittedOverlayTitle } from "@/app/(projects)/project/components/submitted-overlay/submitted-overlay-title";
import styles from "./submitted-overlay.module.scss";

export const SubmittedOverlay = () => (
  <div className={styles.overlay}>
    <SubmittedOverlayTitle />
    <SubmittedOverlayDescription />
  </div>
);
