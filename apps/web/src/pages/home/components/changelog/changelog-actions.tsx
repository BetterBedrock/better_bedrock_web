import { useNavigate } from "react-router-dom";
import { Button } from "~/components/bedrock/button";
import { styles } from ".";
import { Routes } from "~/utils/routes";

export const ChangelogActions = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.actions}>
      <Button
        text="Information Page"
        width={"100%"}
        height={"auto"}
        type="alwaysGreen"
        onTap={() => navigate(Routes.INFORMATION)}
      />
      <Button
        text="Join Discord"
        width={"100%"}
        height={"auto"}
        outlinePaddingLeft="0"
        type="alwaysWhite"
        onTap={() => window.open("https://discord.gg/ZGK5WYXnEY", "_blank", "noopener,noreferrer")}
      />
    </div>
  );
};
