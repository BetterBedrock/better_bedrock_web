import { useNavigate } from "react-router-dom";
import { Button } from "~/components/bedrock/button";
import { Routes } from "~/utils/routes";
import { BedrockText } from "~/components/bedrock/bedrock-text";

import { styles } from ".";

export const HeroAction = () => {
  const navigate = useNavigate();
  return (
    <Button
      width="100%"
      type="green"
      onClick={() => navigate(Routes.HOME)}
      className={styles.return}
      center
    >
      <BedrockText text="Return to Home" type="p" color="white" />
    </Button>
  );
};
