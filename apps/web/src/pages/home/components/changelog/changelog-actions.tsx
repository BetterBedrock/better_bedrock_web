import { useNavigate } from "react-router-dom";
import { styles } from ".";
import { Routes } from "~/utils/routes";
import { ButtonGroup } from "~/components/button-group/button-group";
import { Button } from "~/components/bedrock/button";
import { BedrockText } from "~/components/bedrock/bedrock-text";

export const ChangelogActions = () => {
  const navigate = useNavigate();
  return (
    <ButtonGroup className={styles.actions}>
      <Button
        width="100%"
        height="auto"
        type="green"
        onClick={() => navigate(Routes.INFORMATION)}
        center
      >
        <BedrockText type="p" text="Information Page" color="white" />
      </Button>
      <Button
        width="100%"
        height="auto"
        type="white"
        onClick={() =>
          window.open("https://discord.gg/ZGK5WYXnEY", "_blank", "noopener,noreferrer")
        }
        center
      >
        <BedrockText type="p" text="Join Discord" color="black" />
      </Button>
    </ButtonGroup>
  );
};
