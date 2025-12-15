import { styles, SubmittedOverlayDescription, SubmittedOverlayTitle } from ".";

export const SubmittedOverlay = () => (
  <div className={styles.overlay}>
    <SubmittedOverlayTitle />
    <SubmittedOverlayDescription />
  </div>
);
