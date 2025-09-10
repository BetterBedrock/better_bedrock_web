import { styles } from ".";
import { useAuth } from "~/providers/auth";
import { useEffect } from "react";
import { Button } from "~/components/bedrock/button";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import { useNavigate } from "react-router-dom";
import { Routes } from "~/utils/routes";

export const HeroActions = () => {
  const navigate = useNavigate();

  const { user, googleLogin } = useAuth();

  const handleGoogleLogin = async () => {
    googleLogin();
  };

  useEffect(() => {
    if (user) {
      navigate(Routes.PROFILE + `/${user.name}`);
    }
  }, [user]);

  return (
    <Button type="green" onClick={handleGoogleLogin} className={styles.actions} center>
      <BedrockText color="white" text="Google Login" type="p" />
    </Button>
  );
};
