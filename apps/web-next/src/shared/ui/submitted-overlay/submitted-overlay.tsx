import { SubmittedOverlayTitle } from "./submitted-overlay-title";
import { SubmittedOverlayDescription } from "./submitted-overlay-description";
import styles from "./submitted-overlay.module.scss";

export const SubmittedOverlay = () => (
  <div className={styles.overlay}>
    <SubmittedOverlayTitle />
    <SubmittedOverlayDescription />
  </div>
);
