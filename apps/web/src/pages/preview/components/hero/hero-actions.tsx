import { useNavigate } from "react-router-dom";
import { Routes } from "~/utils/routes";
import { styles } from ".";
import { ButtonGroup } from "~/components/button-group/button-group";
import { Button } from "~/components/bedrock/button";
import { BedrockText } from "~/components/bedrock/bedrock-text";

export const HeroActions = () => {
  const navigate = useNavigate();

  return (
    <ButtonGroup className={styles.actions}>
      <Button
        width="100%"
        height="auto"
        type="green"
        onClick={() => navigate(Routes.HOME)}
        center
      >
        <BedrockText color="white" type="p" text="Home Page" />
      </Button>
      <Button
        width="100%"
        height="auto"
        type="white"
        onClick={() => navigate(Routes.INFORMATION)}
        center
      >
        <BedrockText color="white" type="p" text="Information Page" />
      </Button>
    </ButtonGroup>
  );
};
