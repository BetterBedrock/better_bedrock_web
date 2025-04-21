import { useNavigate } from "react-router-dom";
import { Button } from "~/components/bedrock/button";
import { styles } from ".";
import { Routes } from "~/utils/routes";

export const HeroActions = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.actions}>
      <Button
        text="Download Now"
        width="100%"
        type="alwaysGreen"
        onTap={() => {
          navigate(Routes.DOWNLOADS);
        }}
      />
      <Button
        text="Join Discord"
        width="100%"
        type="alwaysWhite"
        outlinePaddingLeft="0px"
        onTap={() => window.open("https://discord.gg/ZGK5WYXnEY", "_blank", "noopener,noreferrer")}
      />
    </div>
  );
};
