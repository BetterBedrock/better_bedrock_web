import { Button } from "~/components/bedrock/button";
import { ButtonSeparator } from "~/components/bedrock/button-separator";
import { styles } from ".";
import { useNotification } from "~/providers/notification";

export const CommunityActions = () => {
  const {sendNotification} = useNotification();
  return (
    <ButtonSeparator className={styles.actions}>
      <Button outlinePaddingRight="0" text="Submit YOUR texturepack" type="alwaysGreen" width="100%" onClick={() => {
        sendNotification({
          title: "Texturepack submission",
          label: "Please submit your texturepack to our Discord server on #submissions.",
          type: "info",
        });
      }} />
      <Button
        text="Watch theme creation tutorial"
        width="100%"
        type="alwaysWhite"
        onTap={() => window.open("https://youtu.be/GRQahMrdEoY", "_blank", "noopener,noreferrer")}
      />
    </ButtonSeparator>
  );
};
