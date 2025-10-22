import { useNavigate } from "react-router-dom";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Button } from "~/components/bedrock/button";
import { Routes } from "~/utils/routes";

export const DraftsAction = () => {
  const navigate = useNavigate();
  return (
    <Button type="green" onClick={() => navigate(Routes.CREATE)} center>
      <BedrockText text="Create A Project" type="p" color="white" />
    </Button>
  );
};
