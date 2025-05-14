import { Label } from "../label";
import { BedrockText } from "../bedrock-text/bedrock-text";
import { styles } from ".";

export const Footer = () => (
  <footer>
    <Label width="auto">
      <div className={styles.text}>
        <BedrockText
          text="Copyright © Better Bedrock | All rights reserved | Not affiliated with Mojang Studios"
          type="p"
        />
      </div>
    </Label>
  </footer>
);
