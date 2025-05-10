import { useNavigate } from "react-router-dom";
import { Button } from "~/components/bedrock/button";
import { styles } from ".";
import { Routes } from "~/utils/routes";
import { ButtonSeparator } from "~/components/bedrock/button-separator";

export const HeroActions = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.actions}>
      <ButtonSeparator>
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
      </ButtonSeparator>
    </div>
  );
};
