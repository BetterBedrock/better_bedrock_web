import { BedrockText } from "@/_components/bedrock-text";
import { Button } from "@/_components/button";

import { useActionsSave } from ".";

export const ActionsSave = () => {
  const { saveProject } = useActionsSave();

  return (
    <Button width="100%" height="100%" type="green" onClick={saveProject} center>
      <BedrockText text="Save" type="p" color="white" />
    </Button>
  );
};
