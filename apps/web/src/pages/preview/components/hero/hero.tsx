import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgressIndicator } from "~/components/bedrock/circular-progress-indicator";
import { Routes } from "~/utils/routes";
import {
  styles,
  HeroTitle,
  HeroAction,
  HeroGallery,
  HeroRichDescription,
  useHero,
} from ".";

import { PreviewPopup } from "./preview-popup";
import { Card } from "~/components/bedrock/card";
import { Rating } from "~/components/rating";
import Steve from "~/assets/images/avatars/Steve.png";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Link } from "~/components/link";
import { SimpleEditor } from "~/components/tiptap-templates/simple/simple-editor";
import { HeroUpload } from "~/pages/preview/components/hero/hero-upload";
import { HeroSubmit } from "~/pages/preview/components/hero/hero-submit";

interface HeroProps {
  create?: boolean;
}

export const Hero = ({ create }: HeroProps) => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const { download, fetched, downloads } = useHero({ create });

  if (!create && !fetched) {
    return <CircularProgressIndicator size="medium" />;
  }

  if ((!create && (!downloads || !download)) || !download) {
    navigate(Routes.DOWNLOADS);
    return null;
  }

  const scrollToButton = () => {
    console.log(buttonRef.current);
    buttonRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={styles.preview}>
      {showPopup && <PreviewPopup onClose={() => setShowPopup(false)} downloadItem={download} />}
      <Card className={styles.information}>
        <HeroTitle download={download} create={create} />
        {/* <HeroDescription download={download} /> */}
        <Card sub>
          <div className={styles.header}>
            <img src={Steve} className={styles.avatar} />

            {/* Renders the description, which can now be any React node */}
            <div>
              <BedrockText text={`@${download.creator}`} type="p" color="white" />
              <Rating simple rating={2.5} />
            </div>
          </div>
        </Card>
        {!create && (
          <Link link="#download" onClick={scrollToButton}>
            <BedrockText
              text="Skip to download"
              type="p"
              color="white"
              extraClassName={styles.skip}
            />
          </Link>
        )}
      </Card>

      {create ? (
        <Card className={styles.editor}>
          <SimpleEditor />
        </Card>
      ) : (
        <>
          {download.richDescription?.length === undefined && <HeroGallery download={download} />}

          {download.richDescription?.map((description) => (
            <HeroRichDescription description={description} />
          ))}
        </>
      )}

      <div>
        {/* <HeroTitle download={download} /> */}
        {/* <HeroDescription download={download} /> */}
        {create ? (
          <>
            <HeroUpload />
            <HeroSubmit />
          </>
        ) : (
          <HeroAction ref={buttonRef} setShowPopup={setShowPopup} />
        )}
      </div>
    </div>
  );
};
