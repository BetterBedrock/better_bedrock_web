import { useNavigate } from "react-router-dom";
import { Button } from "~/components/bedrock/button";
import { ButtonSeparator } from "~/components/bedrock/button-separator";
import { Routes } from "~/utils/routes";
import { styles } from ".";

export const HeroActions = () => {
  const navigate = useNavigate();

  return (
    <ButtonSeparator className={styles.actions}>
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
    </ButtonSeparator>
  );
};
