import { Button } from "~/components/bedrock/button";
import { ButtonSeparator } from "~/components/bedrock/button-separator";
import { styles } from ".";

export const BetterBedrockActions = () => (
  <ButtonSeparator className={styles.actions}>
    <Button text="Submit YOUR custom theme" type="alwaysGreen" width="100%" />
    <Button
      text="Watch theme creation tutorial"
      width="100%"
      type="alwaysWhite"
      onTap={() => window.open("https://youtu.be/GRQahMrdEoY", "_blank", "noopener,noreferrer")}
    />
  </ButtonSeparator>
);
