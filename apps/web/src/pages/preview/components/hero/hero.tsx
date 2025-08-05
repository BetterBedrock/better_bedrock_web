import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgressIndicator } from "~/components/bedrock/circular-progress-indicator";
import { Routes } from "~/utils/routes";
import {
  styles,
  HeroTitle,
  HeroDescription,
  HeroAction,
  HeroGallery,
  HeroRichDescription,
  useHero,
} from ".";

import { PreviewPopup } from "./preview-popup";

export const Hero = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const { download, fetched, downloads } = useHero();

  if (!fetched) {
    return <CircularProgressIndicator size="medium" />;
  }

  if (!downloads || !download) {
    navigate(Routes.DOWNLOADS);
    return null;
  }

  return (
    <div className={styles.preview}>
      {showPopup && <PreviewPopup onClose={() => setShowPopup(false)} downloadItem={download} />}
      <div>
        <HeroTitle download={download} />
        <HeroDescription download={download} />
        <HeroAction setShowPopup={setShowPopup} />
      </div>

      {download.richDescription?.length === undefined && <HeroGallery download={download} />}

      {download.richDescription?.map((description) => (
        <HeroRichDescription description={description} />
      ))}
    </div>
  );
};
