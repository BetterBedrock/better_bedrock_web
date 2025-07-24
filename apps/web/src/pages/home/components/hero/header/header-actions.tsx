import { useNavigate } from "react-router-dom";
import { styles } from ".";
import { Routes } from "~/utils/routes";
import { ButtonGroup } from "~/components/button-group/button-group";
import { Button } from "~/components/bedrock/button";
import { BedrockText } from "~/components/bedrock/bedrock-text";

export const HeroActions = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.actions}>
      <ButtonGroup direction="responsive">
        <Button width="100%" type="green" onClick={() => navigate(Routes.DOWNLOADS)} center>
          <BedrockText text="Download Now" type="p" color="white" />
        </Button>
        <Button
          width="100%"
          type="white"
          onClick={() =>
            window.open("https://discord.gg/ZGK5WYXnEY", "_blank", "noopener,noreferrer")
          }
          center
        >
          <BedrockText text="Join Discord" type="p" color="black" />
        </Button>
      </ButtonGroup>
    </div>
  );
};
