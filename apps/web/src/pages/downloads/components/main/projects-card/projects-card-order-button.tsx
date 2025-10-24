import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Button } from "~/components/bedrock/button";

import { useProjectsCardSearch } from ".";

interface ProjectsCardOrderButtonProps {
  type: string;
}

export const ProjectsCardOrderButton = ({ type }: ProjectsCardOrderButtonProps) => {
  const { selectedOrder, setSelectedOrder } = useProjectsCardSearch();

  return (
    <Button
      type="dark"
      width="100%"
      center
      isClicked={type === selectedOrder}
      isToggled={type === selectedOrder}
      onClick={() => setSelectedOrder(type)}
    >
      <BedrockText type="p" text={type} color="white" />
    </Button>
  );
};
