import { Label } from "../label";
import { BedrockText } from "../bedrock-text/bedrock-text";
import { styles } from ".";
import { Routes } from "~/utils/routes";
import { Link } from "~/components/link";

export const Footer = () => {
  return (
    <footer>
      <Label width="auto">
        <div className={styles.footer}>
          <div className={styles.links}>
            <Link link={Routes.PRIVACY_POLICY}>
              <BedrockText text="Privacy Policy" type="p" />
            </Link>
            <BedrockText text="|" type="p" />
            <Link link={Routes.TERMS}>
              <BedrockText text="Terms" type="p" />
            </Link>
            <BedrockText text="|" type="p" />
            <Link isExternalLink={true} link="https://github.com/BetterBedrock/better_bedrock_web">
              <BedrockText text="GitHub" type="p" />
            </Link>
          </div>
          <BedrockText
            text="Copyright © Better Bedrock | All rights reserved | Not affiliated with Mojang Studios"
            type="p"
            extraClassName={styles.text}
          />
        </div>
      </Label>
    </footer>
  );
};
