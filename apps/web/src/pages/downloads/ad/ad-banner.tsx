import { styles } from ".";
import video from "~/assets/videos/WebBannerOC.mp4";

export const AdBanner = () => (
  <video src={video} loop autoPlay muted className={styles.video} />
);
