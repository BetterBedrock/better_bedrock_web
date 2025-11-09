import { BedrockText } from "@/_components/bedrock-text";
import { Link } from "@/_components/link";
import { Popup } from "@/_components/popup";
import { Routes } from "@/utils/routes";

import { styles } from ".";

export const PreviewPopupFooter = () => (
  <Popup.Part>
    <div className={styles.links}>
      <Link link={Routes.PRIVACY_POLICY}>
        <BedrockText text="Privacy Policy" type="p" />
      </Link>
      <BedrockText color="white" text="|" type="p" />
      <Link link={Routes.TERMS}>
        <BedrockText text="Terms" type="p" />
      </Link>
    </div>
  </Popup.Part>
);
