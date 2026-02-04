import { SubmittedOverlayTitle } from "./submitted-overlay-title";
import { SubmittedOverlayDescription } from "./submitted-overlay-description";
import styles from "./submitted-overlay.module.scss";

export const SubmittedOverlay = () => (
  <div className={styles.overlay}>
    {/* note: maybe its better without these texts, less clutter etc. also it scrolls to the top where info is basicaly the same like below. */}
    {/* <SubmittedOverlayTitle />
    <SubmittedOverlayDescription /> */}
  </div>
);
