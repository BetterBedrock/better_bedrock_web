import { styles, useHandleGoogleLogin } from ".";
import { Button } from "~/components/bedrock/button";
import { BedrockText } from "~/components/bedrock/bedrock-text";

export const HeroActions = () => {
  const handleGoogleLoginButtonClick = useHandleGoogleLogin();

  return (
    <Button type="green" onClick={handleGoogleLoginButtonClick} className={styles.actions} center>
      <BedrockText color="white" text="Google Login" type="p" />
    </Button>
  );
};
