"use client";

import { BedrockText } from "@/shared/ui/bedrock-text";
import { Button } from "@/shared/ui/button";
import { SearchOrder } from "@/shared/lib/openapi";
import { useProjectsCardSearch } from "@/pages/downloads/model/projects-card-search";

interface ProjectsCardOrderButtonProps {
  type: SearchOrder;
}

export const ProjectsCardOrderButton = ({
  type,
}: ProjectsCardOrderButtonProps) => {
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
