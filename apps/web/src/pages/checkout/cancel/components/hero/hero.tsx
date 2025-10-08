import { useNavigate } from "react-router-dom";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Button } from "~/components/bedrock/button";
import { Routes } from "~/utils/routes";
import { styles } from ".";

export const Hero = () => {
  const navigate = useNavigate();
  return (
    <div>
      <BedrockText type="h1" text="CHECKOUT CANCELLED" color="white" font="Minecraft" />
      <BedrockText
        type="p"
        color="white"
        text={
          "You have cancelled your checkout. If you have any questions or need assistance, please reach out to us."
        }
      />
      <Button
        width="100%"
        type="green"
        onClick={() => {
          navigate(Routes.HOME);
        }}
        className={styles.return}
        center
      >
        <BedrockText text="Return to Home" type="p" color="white" />
      </Button>
    </div>
  );
};
