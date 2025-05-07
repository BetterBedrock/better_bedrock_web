import { useNavigate } from "react-router-dom";
import { Button } from "~/components/bedrock/button";
import { Routes } from "~/utils/routes";
import { styles } from ".";

export const HeroActions = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(Routes.PANEL);
  };

  return <Button text="Login" type="alwaysGreen" onClick={handleClick} className={styles.actions} />;
};
