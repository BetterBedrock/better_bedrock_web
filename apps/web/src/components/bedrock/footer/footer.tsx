import { Label } from "../label";
import { BedrockText } from "../bedrock-text/bedrock-text";
import { styles } from ".";
import { Routes } from "~/utils/routes";

export const Footer = () => {

  return (
    <footer>
      <Label width="auto">
        <div className={styles.footer}>
          <div className={styles.links}>
            <BedrockText
              text="Privacy Policy"
              type="p"
              link={Routes.PRIVACY_POLICY}
              isExternalLink={false}
            />
            <BedrockText
              text="GitHub"
              type="p"
              link="https://github.com/BetterBedrock/better_bedrock_web"
              isExternalLink={true}
            />
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
