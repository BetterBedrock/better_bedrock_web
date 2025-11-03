"use client"

import { BedrockText } from "@/_components/bedrock-text";
import { Button } from "@/_components/button";

import { styles, useHandleGoogleLogin, useRedirectLoggedUser } from ".";

export const HeroActions = () => {
  useRedirectLoggedUser();
  const handleGoogleLoginButtonClick = useHandleGoogleLogin();

  return (
    <Button type="green" onClick={handleGoogleLoginButtonClick} className={styles.actions} center>
      <BedrockText color="white" text="Google Login" type="p" />
    </Button>
  );
};
