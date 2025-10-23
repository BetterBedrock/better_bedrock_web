import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Button } from "~/components/bedrock/button";

import { useActionsSave } from ".";

export const ActionsSave = () => {
  const { saveProject } = useActionsSave();

  return (
    <Button width="100%" height="100%" type="green" onClick={saveProject} center>
      <BedrockText text="Save" type="p" color="white" />
    </Button>
  );
};
