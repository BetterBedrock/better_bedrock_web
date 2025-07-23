import { useNavigate } from "react-router-dom";
import { Button } from "~/components/bedrock/button";
import { Routes } from "~/utils/routes";
import { styles } from ".";
import { ButtonGroup } from "~/components/button-group/button-group";

export const HeroActions = () => {
  const navigate = useNavigate();

  return (
    <ButtonGroup className={styles.actions}>
      <Button
        text="Home Page"
        width="100%"
        height="auto"
        type="alwaysGreen"
        onTap={() => navigate(Routes.HOME)}
      />
      <Button
        text="Information Page"
        width="100%"
        height="auto"
        type="alwaysWhite"
        onTap={() => navigate(Routes.INFORMATION)}
      />
    </ButtonGroup>
  );
};
