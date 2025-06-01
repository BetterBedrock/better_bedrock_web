import { useNavigate } from "react-router-dom";
import { Button } from "~/components/bedrock/button";
import { Routes } from "~/utils/routes";

export const HeroAction = () => {
  const navigate = useNavigate();

  return (
    <Button
      text="Download Latest Better Bedrock Texture Pack"
      width="100%"
      height="auto"
      type="alwaysGreen"
      onTap={() => navigate(Routes.HOME)}
    />
  );
};
