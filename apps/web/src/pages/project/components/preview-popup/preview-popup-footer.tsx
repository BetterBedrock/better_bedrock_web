import { BedrockText } from "~/components/bedrock/bedrock-text";
import { styles } from ".";
import { Link } from "~/components/link";
import { Routes } from "~/utils/routes";
import { Popup } from "~/components/bedrock/popup";

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
