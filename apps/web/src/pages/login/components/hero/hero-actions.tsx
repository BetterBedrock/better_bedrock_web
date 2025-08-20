// import { useNavigate } from "react-router-dom";
// import { Routes } from "~/utils/routes";
import { styles } from ".";
import { useAuth } from "~/providers/auth";
import { useEffect } from "react";
import { Button } from "~/components/bedrock/button";
import { BedrockText } from "~/components/bedrock/bedrock-text";

interface HeroActionsProps {
  password: string;
}

export const HeroActions = ({ password }: HeroActionsProps) => {
  // const navigate = useNavigate();
  const { adminAuthenticate, authenticated, googleLogin } = useAuth();

  const handleClick = async () => {
    await adminAuthenticate(password);
  };

  const handleGoogleLogin = async () => {
    googleLogin();
  }

  useEffect(() => {
    // if (authenticated) {
    //   navigate(Routes.PANEL);
    // }
  }, [authenticated]);

  return (
    <>
      <Button type="green" onClick={handleClick} className={styles.actions} center>
        <BedrockText color="white" text="Login" type="p" />
      </Button>
      <Button type="dark" onClick={handleGoogleLogin} className={styles.actions} center>
        <BedrockText color="white" text="Google Login" type="p" />
      </Button>
    </>
  );
};
