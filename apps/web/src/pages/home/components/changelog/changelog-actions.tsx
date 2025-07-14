import { useNavigate } from "react-router-dom";
import { Button } from "~/components/bedrock/button";
import { styles } from ".";
import { Routes } from "~/utils/routes";
import { ButtonGroup } from "~/components/button-group/button-group";

export const ChangelogActions = () => {
  const navigate = useNavigate();
  return (
    <ButtonGroup className={styles.actions}>
      <Button
        text="Information Page"
        width="100%"
        height="auto"
        type="alwaysGreen"
        onTap={() => navigate(Routes.INFORMATION)}
      />
      <Button
        text="Join Discord"
        width="100%"
        height="auto"
        type="alwaysWhite"
        onTap={() => window.open("https://discord.gg/ZGK5WYXnEY", "_blank", "noopener,noreferrer")}
      />
    </ButtonGroup>
  );
};
