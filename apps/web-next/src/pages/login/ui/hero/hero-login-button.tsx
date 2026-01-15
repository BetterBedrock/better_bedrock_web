"use client";

import { BedrockText } from "@/shared/ui/bedrock-text";
import { Button } from "@/shared/ui/button";
import { useHandleGoogleLogin } from "@/pages/login/model/use-handle-google-login";
import { useRedirectLoggedUser } from "@/pages/login/model/use-redirect-logged-user";

import styles from "./hero.module.scss";

export const HeroLoginButton = () => {
  useRedirectLoggedUser();
  const handleGoogleLoginButtonClick = useHandleGoogleLogin();

  return (
    <Button
      type="green"
      onClick={handleGoogleLoginButtonClick}
      className={styles.actions}
      center
    >
      <BedrockText color="white" text="Google Login" type="p" />
    </Button>
  );
};
