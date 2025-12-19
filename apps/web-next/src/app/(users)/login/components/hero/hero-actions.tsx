"use client";

import { BedrockText } from "@/components/bedrock-text";
import { Button } from "@/components/button";
import { useHandleGoogleLogin } from "./hook/use-handle-google-login";
import { useRedirectLoggedUser } from "./hook/use-redirect-logged-user";

import styles from "./hero.module.scss";

export const HeroActions = () => {
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
