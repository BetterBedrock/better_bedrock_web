import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Button } from "~/components/bedrock/button";

interface ActionsSaveProps {
  onClick: () => Promise<void>;
}

export const ActionsSave = ({ onClick }: ActionsSaveProps) => (
  <Button width="100%" type="green" onClick={onClick} center>
    <BedrockText text="Save" type="p" color="white" />
  </Button>
);
