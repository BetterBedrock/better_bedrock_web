import { useNavigate } from "react-router-dom";
import { Button } from "~/components/bedrock/button";
import { Routes } from "~/utils/routes";
import { styles } from ".";
import { useAuth } from "~/providers/auth";
import { useEffect } from "react";

interface HeroActionsProps {
  password: string;
}

export const HeroActions = ({ password }: HeroActionsProps) => {
  const navigate = useNavigate();
  const { authenticate, authenticated } = useAuth();

  const handleClick = async () => {
    await authenticate(password);
  };

  useEffect(() => {
    if (authenticated) {
      navigate(Routes.PANEL);
    }
  }, [authenticated]);

  return (
    <Button text="Login" type="alwaysGreen" onClick={handleClick} className={styles.actions} />
  );
};
