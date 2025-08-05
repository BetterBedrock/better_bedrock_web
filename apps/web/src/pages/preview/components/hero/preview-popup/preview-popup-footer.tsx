import { BedrockText } from "~/components/bedrock/bedrock-text";
import { styles } from ".";
import { Link } from "~/components/link";
import { Routes } from "~/utils/routes";

export const PreviewPopupFooter = () => (
  <div className={styles.part}>
    <div className={styles.links}>
      <Link link={Routes.PRIVACY_POLICY}>
        <BedrockText text="Privacy Policy" type="p" />
      </Link>
      <BedrockText color={"white"} text="|" type="p" />
      <Link link={Routes.TERMS}>
        <BedrockText text="Terms" type="p" />
      </Link>
    </div>
  </div>
);
