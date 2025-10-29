import { Button } from "~/components/bedrock/button";
import { styles } from ".";
import { useNavigate } from "react-router-dom";
import { Routes } from "~/utils/routes";
import { BedrockText } from "~/components/bedrock/bedrock-text";

export const HeroAction = () => {
  const navigate = useNavigate();

  return (
    <Button
      width="100%"
      height="auto"
      className={styles.return}
      type="green"
      onClick={() => navigate(Routes.HOME)}
      center
    >
      <BedrockText text="Return to Home" type="p" color="white" />
    </Button>
  );
};
