import { useNavigate } from "react-router-dom";
import { Button } from "~/components/bedrock/button";
import { styles } from ".";
import { Routes } from "~/utils/routes";
import { ButtonGroup } from "~/components/button-group/button-group";

export const HeroActions = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.actions}>
      <ButtonGroup direction="responsive">
        <Button
          text="Download Now"
          width="100%"
          type="alwaysGreen"
          onTap={() => navigate(Routes.DOWNLOADS)}
        />
        <Button
          text="Join Discord"
          width="100%"
          type="alwaysWhite"
          onTap={() =>
            window.open("https://discord.gg/ZGK5WYXnEY", "_blank", "noopener,noreferrer")
          }
        />
      </ButtonGroup>
    </div>
  );
};
